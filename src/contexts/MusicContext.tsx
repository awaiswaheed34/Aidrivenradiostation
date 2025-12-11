import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Song } from '../data/songs';

interface MusicContextType {
    currentSong: Song | null;
    isPlaying: boolean;
    volume: number;
    currentTime: number;
    duration: number;
    songs: Song[];
    currentSongIndex: number;
    isShuffling: boolean;
    isRepeating: boolean;
    playSong: (song: Song) => void;
    playPause: () => void;
    nextSong: () => void;
    previousSong: () => void;
    setVolume: (volume: number) => void;
    seekTo: (time: number) => void;
    toggleShuffle: () => void;
    toggleRepeat: () => void;
    playRandomSong: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ songs: Song[]; children: React.ReactNode }> = ({
    songs,
    children
}) => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolumeState] = useState(0.7);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio element
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.volume = volume;

        const audio = audioRef.current;

        // Event listeners
        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleDurationChange = () => {
            setDuration(audio.duration);
        };

        const handleEnded = () => {
            if (isRepeating) {
                audio.currentTime = 0;
                audio.play();
            } else {
                nextSong();
            }
        };

        const handleLoadedData = () => {
            setDuration(audio.duration);
        };

        const handleError = () => {
            console.error('Error playing audio:', currentSong?.title);
            // Try to play next song if current fails
            nextSong();
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('durationchange', handleDurationChange);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('loadeddata', handleLoadedData);
        audio.addEventListener('error', handleError);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('durationchange', handleDurationChange);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('loadeddata', handleLoadedData);
            audio.removeEventListener('error', handleError);
        };
    }, [currentSong, isRepeating]);

    const playSong = (song: Song) => {
        if (!audioRef.current) return;

        const audio = audioRef.current;
        audio.src = song.url;
        audio.load();

        setCurrentSong(song);
        const index = songs.findIndex(s => s.id === song.id);
        setCurrentSongIndex(index);

        audio.play().then(() => {
            setIsPlaying(true);
        }).catch((error) => {
            console.error('Error playing song:', error);
            setIsPlaying(false);
        });
    };

    const playPause = () => {
        if (!audioRef.current || !currentSong) return;

        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().then(() => {
                setIsPlaying(true);
            }).catch((error) => {
                console.error('Error playing song:', error);
            });
        }
    };

    const nextSong = () => {
        if (songs.length === 0) return;

        let nextIndex;
        if (isShuffling) {
            nextIndex = Math.floor(Math.random() * songs.length);
        } else {
            nextIndex = (currentSongIndex + 1) % songs.length;
        }

        playSong(songs[nextIndex]);
    };

    const previousSong = () => {
        if (songs.length === 0) return;

        let prevIndex;
        if (isShuffling) {
            prevIndex = Math.floor(Math.random() * songs.length);
        } else {
            prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
        }

        playSong(songs[prevIndex]);
    };

    const setVolume = (newVolume: number) => {
        setVolumeState(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const seekTo = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const toggleShuffle = () => {
        setIsShuffling(!isShuffling);
    };

    const toggleRepeat = () => {
        setIsRepeating(!isRepeating);
    };

    const playRandomSong = () => {
        if (songs.length === 0) return;
        const randomIndex = Math.floor(Math.random() * songs.length);
        playSong(songs[randomIndex]);
    };

    return (
        <MusicContext.Provider value={{
            currentSong,
            isPlaying,
            volume,
            currentTime,
            duration,
            songs,
            currentSongIndex,
            isShuffling,
            isRepeating,
            playSong,
            playPause,
            nextSong,
            previousSong,
            setVolume,
            seekTo,
            toggleShuffle,
            toggleRepeat,
            playRandomSong
        }}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = (): MusicContextType => {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
};