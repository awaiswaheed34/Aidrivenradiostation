import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Shuffle, Repeat } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';

export const MusicPlayer: React.FC = () => {
    const {
        currentSong,
        isPlaying,
        volume,
        currentTime,
        duration,
        isShuffling,
        isRepeating,
        playPause,
        nextSong,
        previousSong,
        setVolume,
        seekTo,
        toggleShuffle,
        toggleRepeat
    } = useMusic();

    const formatTime = (seconds: number): string => {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProgress = parseFloat(e.target.value);
        const newTime = (newProgress / 100) * duration;
        seekTo(newTime);
    };

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Don't show player if no song is selected
    if (!currentSong) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-800 p-4 z-50">
            <div className="max-w-6xl mx-auto">
                {/* Main Player */}
                <div className="flex items-center justify-between mb-4">
                    {/* Current Song Info */}
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex-shrink-0 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">♪</span>
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="text-white font-semibold truncate">
                                {currentSong.title}
                            </h3>
                            <p className="text-gray-400 text-sm truncate">
                                {currentSong.artist} • {currentSong.genre}
                            </p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleShuffle}
                            className={`p-2 rounded-full transition-colors ${
                                isShuffling ? 'text-purple-500' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            <Shuffle size={20} />
                        </button>

                        <button
                            onClick={previousSong}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <SkipBack size={24} />
                        </button>

                        <button
                            onClick={playPause}
                            className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
                        >
                            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                        </button>

                        <button
                            onClick={nextSong}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <SkipForward size={24} />
                        </button>

                        <button
                            onClick={toggleRepeat}
                            className={`p-2 rounded-full transition-colors ${
                                isRepeating ? 'text-purple-500' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            <Repeat size={20} />
                        </button>
                    </div>

                    {/* Volume */}
                    <div className="flex items-center space-x-2 flex-1 justify-end min-w-0">
                        <Volume2 size={20} className="text-gray-400" />
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-24 accent-purple-500"
                        />
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400 w-10">
                        {formatTime(currentTime)}
                    </span>
                    <div className="flex-1">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progressPercentage}
                            onChange={handleProgressChange}
                            className="w-full accent-purple-500"
                        />
                    </div>
                    <span className="text-xs text-gray-400 w-10">
                        {formatTime(duration)}
                    </span>
                </div>
            </div>
        </div>
    );
};