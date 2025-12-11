import { motion } from 'motion/react';
import { Play, Pause, Volume2, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack] = useState({
    title: 'Midnight Synthwave',
    artist: 'Digital Dreams',
    album: 'Neon Nights',
  });

  // Animated particles
  const particles = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1717501219263-9aa2d6a768d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwYWl8ZW58MXx8fHwxNzY1NDEzODcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Neural network background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
        </div>

        {/* Gold Particles Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
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
              style={{
                boxShadow: '0 0 10px #D4AF37',
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative w-full max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-medium">
                AI-Powered Radio Experience
              </span>
            </motion.div>

            <h1 className="mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D4AF37] to-white">
              The Future of Radio<br />is Here
            </h1>

            <p className="mb-12 text-white/70 max-w-2xl mx-auto text-lg">
              Experience intelligent music curation powered by advanced AI.
              <br />
              Every beat, every track, perfectly selected just for you.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="group relative px-12 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-full text-black font-semibold overflow-hidden"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 bg-white"
              />
              <span className="relative flex items-center gap-3">
                {isPlaying ? <Pause fill="black" /> : <Play fill="black" />}
                <span>{isPlaying ? 'Pause' : 'Play'} Live Radio</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Currently Playing Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-20 max-w-2xl mx-auto"
          >
            <div className="relative p-8 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-2xl border border-[#D4AF37]/20 backdrop-blur-xl overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5" />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#D4AF37] text-sm uppercase tracking-wider">
                    Now Playing
                  </span>
                  <motion.div
                    animate={{
                      opacity: isPlaying ? [1, 0.3, 1] : 1,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: isPlaying ? Infinity : 0,
                    }}
                    className="flex gap-1"
                  >
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: isPlaying
                            ? [8, 20, 8]
                            : 8,
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: isPlaying ? Infinity : 0,
                          delay: i * 0.1,
                        }}
                        className="w-1 bg-[#D4AF37] rounded-full"
                      />
                    ))}
                  </motion.div>
                </div>

                <h3 className="mb-2">{currentTrack.title}</h3>
                <p className="text-white/60 mb-6">
                  {currentTrack.artist} • {currentTrack.album}
                </p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: isPlaying ? '60%' : '0%' }}
                      transition={{ duration: 3 }}
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F]"
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-white/40">
                    <span>2:34</span>
                    <span>4:12</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 hover:bg-white/5 rounded-full transition-colors"
                  >
                    <Heart size={20} className="text-white/60 hover:text-[#D4AF37]" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-4 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-full"
                  >
                    {isPlaying ? (
                      <Pause size={24} fill="black" className="text-black" />
                    ) : (
                      <Play size={24} fill="black" className="text-black" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 hover:bg-white/5 rounded-full transition-colors"
                  >
                    <Volume2 size={20} className="text-white/60" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Host Message Section */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 bg-gradient-to-r from-[#D4AF37]/10 to-transparent border-l-4 border-[#D4AF37] rounded-r-2xl"
          >
            <div className="flex items-start gap-4">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center"
              >
                <span className="text-black font-semibold text-sm">AI</span>
              </motion.div>
              <div>
                <h4 className="mb-2 text-[#D4AF37]">AI Host Says</h4>
                <p className="text-white/70 text-sm md:text-base">
                  "Welcome to wayyFM! I've curated a perfect blend of synthwave and electronic beats for your evening. The energy is about to shift – get ready for something special."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            Powered by Intelligence
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'AI Curation',
                description: 'Advanced algorithms analyze millions of tracks to find your perfect sound',
              },
              {
                title: 'Real-Time Adaptation',
                description: 'Music that evolves with your mood, time of day, and listening patterns',
              },
              {
                title: 'Live Interaction',
                description: 'Engage with our AI host and influence the music selection in real-time',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl hover:border-[#D4AF37]/50 transition-all"
              >
                <h4 className="mb-3 text-[#D4AF37]">{feature.title}</h4>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
