import React, { useState, useEffect } from 'react';
import { Play, Pause, Search, Filter } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';
import { Song } from '../data/songs';

export const MusicLibraryPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
    
    const { songs, currentSong, isPlaying, playSong, playPause } = useMusic();

    const genres = ['All', ...Array.from(new Set(songs.map(song => song.genre)))];

    useEffect(() => {
        let filtered = songs;

        if (searchTerm) {
            filtered = filtered.filter(song =>
                song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                song.artist.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedGenre !== 'All') {
            filtered = filtered.filter(song => song.genre === selectedGenre);
        }

        setFilteredSongs(filtered);
    }, [searchTerm, selectedGenre, songs]);

    const handleSongPlay = (song: Song) => {
        if (currentSong?.id === song.id) {
            playPause();
        } else {
            playSong(song);
        }
    };

    return (
        <div className="min-h-screen pt-24 md:pt-32 pb-32 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                        Music Library
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Explore our curated collection of timeless classics and discover your next favorite song
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-6 mb-12">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search songs or artists..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                        />
                    </div>
                    
                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            className="bg-gray-900 border border-gray-700 rounded-xl px-12 py-4 text-white focus:border-purple-500 focus:outline-none min-w-[200px]"
                        >
                            {genres.map(genre => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Song Grid */}
                <div className="grid gap-4">
                    {filteredSongs.map((song) => (
                        <div
                            key={song.id}
                            className={`bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border transition-all hover:bg-gray-800/50 hover:border-purple-500/50 ${
                                currentSong?.id === song.id ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 flex-1 min-w-0">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shrink-0 flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">♪</span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-white font-semibold truncate mb-1">
                                            {song.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm truncate">
                                            {song.artist} • {song.genre} • {song.duration}
                                        </p>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => handleSongPlay(song)}
                                    className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors ml-4"
                                >
                                    {currentSong?.id === song.id && isPlaying ? (
                                        <Pause size={20} />
                                    ) : (
                                        <Play size={20} />
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No results */}
                {filteredSongs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">
                            No songs found matching your search criteria.
                        </p>
                    </div>
                )}

                {/* Stats */}
                <div className="mt-12 text-center">
                    <p className="text-gray-400">
                        Showing {filteredSongs.length} of {songs.length} songs
                    </p>
                </div>
            </div>
        </div>
    );
};