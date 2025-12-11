import { motion } from 'motion/react';
import { Play, Music2, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function DiscoverPage() {
  const playlists = [
    {
      id: 1,
      title: 'Morning Energy',
      mood: 'Uplifting & Energetic',
      tracks: 42,
      duration: '2h 34m',
      color: 'from-orange-500 to-pink-500',
    },
    {
      id: 2,
      title: 'Focus Flow',
      mood: 'Calm & Concentrated',
      tracks: 38,
      duration: '3h 12m',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 3,
      title: 'Night Vibes',
      mood: 'Chill & Atmospheric',
      tracks: 51,
      duration: '4h 8m',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      id: 4,
      title: 'Workout Fuel',
      mood: 'High Energy & Intense',
      tracks: 35,
      duration: '2h 15m',
      color: 'from-red-500 to-orange-500',
    },
    {
      id: 5,
      title: 'Deep Thoughts',
      mood: 'Introspective & Mellow',
      tracks: 29,
      duration: '2h 45m',
      color: 'from-teal-500 to-green-500',
    },
    {
      id: 6,
      title: 'Party Mode',
      mood: 'Upbeat & Dance',
      tracks: 47,
      duration: '3h 22m',
      color: 'from-pink-500 to-purple-500',
    },
  ];

  const categories = [
    { icon: TrendingUp, label: 'Trending Now', count: 24 },
    { icon: Clock, label: 'Recently Added', count: 18 },
    { icon: Music2, label: 'Genres', count: 32 },
    { icon: Sparkles, label: 'AI Picks', count: 15 },
  ];

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D4AF37]">
            Discover Music
          </h1>
          <p className="text-white/60 text-lg">
            AI-curated playlists that adapt to your taste and mood
          </p>
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl hover:border-[#D4AF37]/50 transition-all text-left group"
            >
              <category.icon className="mb-3 text-[#D4AF37] group-hover:scale-110 transition-transform" size={24} />
              <h4 className="mb-1">{category.label}</h4>
              <p className="text-sm text-white/40">{category.count} playlists</p>
            </motion.button>
          ))}
        </div>

        {/* Playlists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group relative bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all cursor-pointer"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${playlist.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

              {/* Glow Effect */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 via-transparent to-transparent"
              />

              <div className="relative p-6">
                {/* Play Button Overlay */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center shadow-lg shadow-[#D4AF37]/50"
                >
                  <Play size={20} fill="black" className="text-black ml-1" />
                </motion.div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {playlist.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">{playlist.mood}</p>

                  <div className="flex items-center gap-4 text-sm text-white/40">
                    <span className="flex items-center gap-1">
                      <Music2 size={14} />
                      {playlist.tracks} tracks
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {playlist.duration}
                    </span>
                  </div>
                </div>

                {/* Waveform Visualization */}
                <div className="flex gap-1 h-16 items-end">
                  {Array.from({ length: 40 }, (_, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: Math.random() * 40 + 20 }}
                      whileHover={{
                        height: [null, Math.random() * 60 + 20],
                      }}
                      transition={{
                        duration: 0.3,
                        delay: i * 0.01,
                      }}
                      className="flex-1 bg-gradient-to-t from-[#D4AF37]/50 to-[#D4AF37]/20 rounded-t"
                    />
                  ))}
                </div>
              </div>

              {/* Gold Border Animation on Hover */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] origin-left"
              />
            </motion.div>
          ))}
        </div>

        {/* AI Recommendation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#D4AF37]/30 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759386850821-7b63d7f5af08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdvbGQlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NTQxMzg3MHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="AI background"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <Sparkles className="text-[#D4AF37]" size={28} />
              </motion.div>
              <h3>AI Recommendation</h3>
            </div>
            <p className="text-white/70 mb-4">
              Based on your listening history and current time of day, I've created a special mix
              combining ambient electronica with subtle jazz influences. Perfect for your current vibe.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black rounded-full flex items-center gap-2"
            >
              <Play size={18} fill="black" />
              <span>Play AI Mix</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
