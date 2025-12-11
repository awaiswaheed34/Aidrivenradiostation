import { motion } from 'motion/react';
import { Clock, Radio, Calendar, Music } from 'lucide-react';

export function SchedulePage() {
  const schedule = [
    {
      time: '00:00 - 06:00',
      title: 'Night Owl Sessions',
      host: 'ARIA',
      description: 'Ambient and downtempo for late night listeners',
      color: 'from-indigo-500/20 to-purple-500/20',
      border: 'border-indigo-500/50',
    },
    {
      time: '06:00 - 09:00',
      title: 'Morning Rise',
      host: 'ARIA',
      description: 'Energetic beats to start your day',
      color: 'from-orange-500/20 to-yellow-500/20',
      border: 'border-orange-500/50',
    },
    {
      time: '09:00 - 12:00',
      title: 'Focus Flow',
      host: 'ARIA',
      description: 'Concentration music for productive mornings',
      color: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/50',
    },
    {
      time: '12:00 - 14:00',
      title: 'Midday Mix',
      host: 'ARIA',
      description: 'Upbeat selections for lunch hours',
      color: 'from-green-500/20 to-teal-500/20',
      border: 'border-green-500/50',
    },
    {
      time: '14:00 - 17:00',
      title: 'Afternoon Drive',
      host: 'ARIA',
      description: 'Smooth grooves for the afternoon',
      color: 'from-pink-500/20 to-rose-500/20',
      border: 'border-pink-500/50',
    },
    {
      time: '17:00 - 20:00',
      title: 'Golden Hour',
      host: 'ARIA',
      description: 'Sunset vibes and evening warmth',
      color: 'from-amber-500/20 to-orange-500/20',
      border: 'border-amber-500/50',
    },
    {
      time: '20:00 - 23:00',
      title: 'Evening Escape',
      host: 'ARIA',
      description: 'Wind down with sophisticated selections',
      color: 'from-violet-500/20 to-purple-500/20',
      border: 'border-violet-500/50',
    },
    {
      time: '23:00 - 00:00',
      title: 'Late Night Lounge',
      host: 'ARIA',
      description: 'Chill vibes for the night ahead',
      color: 'from-slate-500/20 to-gray-500/20',
      border: 'border-slate-500/50',
    },
  ];

  const specialShows = [
    {
      day: 'Monday',
      show: 'Deep Dive Monday',
      time: '21:00',
      description: 'Exploring one artist in depth',
    },
    {
      day: 'Wednesday',
      show: 'Genre Bender',
      time: '20:00',
      description: 'Unexpected musical combinations',
    },
    {
      day: 'Friday',
      show: 'Flashback Friday',
      time: '19:00',
      description: 'Classic hits and forgotten gems',
    },
    {
      day: 'Sunday',
      show: 'Discovery Hour',
      time: '18:00',
      description: 'New releases and emerging artists',
    },
  ];

  const getCurrentTimeSegment = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 6) return 0;
    if (hour >= 6 && hour < 9) return 1;
    if (hour >= 9 && hour < 12) return 2;
    if (hour >= 12 && hour < 14) return 3;
    if (hour >= 14 && hour < 17) return 4;
    if (hour >= 17 && hour < 20) return 5;
    if (hour >= 20 && hour < 23) return 6;
    return 7;
  };

  const currentSegment = getCurrentTimeSegment();

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D4AF37]">
            Broadcast Schedule
          </h1>
          <p className="text-white/60 text-lg">
            24/7 AI-curated programming tailored to your day
          </p>
        </motion.div>

        {/* Current Show Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12 p-8 bg-gradient-to-br from-[#D4AF37]/20 to-[#F4D03F]/10 border-2 border-[#D4AF37] rounded-2xl relative overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-transparent"
          />

          <div className="relative flex items-center gap-4 mb-4">
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
              <Radio className="text-[#D4AF37]" size={32} />
            </motion.div>
            <div>
              <span className="text-[#D4AF37] text-sm uppercase tracking-wider">On Air Now</span>
              <h3 className="text-white">{schedule[currentSegment].title}</h3>
            </div>
          </div>

          <p className="text-white/80 mb-2">{schedule[currentSegment].description}</p>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {schedule[currentSegment].time}
            </span>
            <span className="flex items-center gap-2">
              <Music size={16} />
              Hosted by {schedule[currentSegment].host}
            </span>
          </div>
        </motion.div>

        {/* Daily Schedule Timeline */}
        <div className="mb-16">
          <h3 className="mb-6 text-[#D4AF37]">Daily Schedule</h3>
          <div className="space-y-4">
            {schedule.map((segment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 8 }}
                className={`relative p-6 bg-[#1A1A1A] border-l-4 ${segment.border} rounded-r-2xl hover:bg-[#1A1A1A]/80 transition-all cursor-pointer ${index === currentSegment ? 'ring-2 ring-[#D4AF37]/50' : ''
                  }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${segment.color} rounded-r-2xl`} />

                <div className="relative flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0 w-32">
                    <div className="flex items-center gap-2 text-[#D4AF37]">
                      <Clock size={18} />
                      <span>{segment.time}</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="mb-1">{segment.title}</h4>
                    <p className="text-white/60 text-sm">{segment.description}</p>
                  </div>

                  <div className="flex items-center gap-2 text-white/40 text-sm">
                    <Radio size={16} />
                    <span>{segment.host}</span>
                  </div>
                </div>

                {index === currentSegment && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 right-4"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                      className="px-3 py-1 bg-[#D4AF37] text-black rounded-full text-xs uppercase tracking-wider"
                    >
                      Live
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Special Shows */}
        <div>
          <h3 className="mb-6 text-[#D4AF37]">Weekly Special Shows</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialShows.map((show, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#D4AF37]/20 rounded-xl hover:border-[#D4AF37]/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={18} className="text-[#D4AF37]" />
                      <span className="text-[#D4AF37]">{show.day}</span>
                    </div>
                    <h4>{show.show}</h4>
                  </div>
                  <div className="text-white/60 text-sm flex items-center gap-1">
                    <Clock size={14} />
                    {show.time}
                  </div>
                </div>
                <p className="text-white/60 text-sm">{show.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 p-6 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl"
        >
          <p className="text-white/70 text-sm text-center">
            <span className="text-[#D4AF37]">Note:</span> ARIA continuously adapts the playlist
            within each time segment based on real-time listener preferences and contextual data.
            No two hours are exactly the same.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
