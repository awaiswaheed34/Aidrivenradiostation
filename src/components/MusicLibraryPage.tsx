import { motion } from 'motion/react';
import { Play, Pause, Search, Music } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useMusic } from '../contexts/MusicContext';
import { Song } from '../data/songs';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function MusicLibraryPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
    const { songs, currentSong, isPlaying, playSong, playPause } = useMusic();
    const particles = Array.from({ length: 20 }, (_, i) => i);

    useEffect(() => {
        let filtered = songs;
        if (searchTerm) {
            filtered = filtered.filter(song =>
                song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                song.artist.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredSongs(filtered);
    }, [searchTerm, songs]);

    const handleSongPlay = (song: Song) => {
        if (currentSong?.id === song.id) {
            playPause();
        } else {
            playSong(song);
        }
    };

    return (
        <div className="min-h-screen pt-24 md:pt-32 pb-20 px-6">
            <section className="relative overflow-hidden min-h-[500px] flex items-center">
                <div className="absolute inset-0 opacity-30">
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1717501219263-9aa2d6a768d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwYWl8ZW58MXx8fHwxNzY1NDEzODcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Neural network background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
                </div>
                <div className="absolute inset-0 overflow-hidden">
                    {particles.map((i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: Math.random() * 1000,
                                y: Math.random() * 1000,
                                opacity: 0,
                            }}
                            animate={{
                                y: [null, Math.random() * -100 - 50],
                                opacity: [0, 0.7, 0],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                            className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
                            style={{ boxShadow: '0 0 10px #D4AF37' }}
                        />
                    ))}
                </div>
                <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h1 className="mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D4AF37] to-white">
                            Music Library
                        </h1>
                        <p className="mb-12 text-white/70 max-w-2xl mx-auto text-lg">
                            Explore our curated collection of timeless classics and discover your next favorite song
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative mb-12 max-w-2xl mx-auto"
                    >
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#D4AF37]" size={20} />
                        <input
                            type="text"
                            placeholder="Search songs or artists..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/30 border border-[#D4AF37]/20 rounded-full px-12 py-4 text-white placeholder-white/40 focus:border-[#D4AF37]/50 focus:outline-none backdrop-blur-sm"
                        />
                    </motion.div>
                    <div className="grid gap-4">
                        {filteredSongs.map((song, index) => (
                            <motion.div
                                key={song.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`p-6 bg-gradient-to-br from-black/30 to-[#1A1A1A]/30 border rounded-2xl transition-all hover:border-[#D4AF37]/50 backdrop-blur-sm ${currentSong?.id === song.id ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-[#D4AF37]/10'}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full shrink-0 flex items-center justify-center">
                                            <Music className="text-black" size={20} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-white font-semibold truncate mb-1">{song.title}</h3>
                                            <p className="text-white/60 text-sm truncate">
                                                {song.artist} • {song.genre} • {song.duration}
                                            </p>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleSongPlay(song)}
                                        className="p-3 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] hover:from-[#F4D03F] hover:to-[#D4AF37] rounded-full transition-all ml-4 text-black"
                                    >
                                        {currentSong?.id === song.id && isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {filteredSongs.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                            <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full mx-auto mb-6 flex items-center justify-center">
                                <Search className="text-black" size={32} />
                            </div>
                            <p className="text-white/60 text-lg mb-2">No songs found matching your search criteria.</p>
                            <p className="text-white/40">Try adjusting your search terms.</p>
                        </motion.div>
                    )}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 text-center">
                        <p className="text-white/60">
                            Showing <span className="text-[#D4AF37] font-semibold">{filteredSongs.length}</span> of <span className="text-[#D4AF37] font-semibold">{songs.length}</span> songs
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}