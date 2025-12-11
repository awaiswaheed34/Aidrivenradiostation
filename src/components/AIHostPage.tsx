import { motion } from 'motion/react';
import { Cpu, MessageSquare, Zap, Brain, Radio } from 'lucide-react';
import { useState } from 'react';

export function AIHostPage() {
  const [selectedTab, setSelectedTab] = useState('personality');

  const tabs = [
    { id: 'personality', label: 'Voice Personality', icon: Cpu },
    { id: 'technology', label: 'Behind the AI', icon: Brain },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'interactions', label: 'Interactions', icon: Zap },
  ];

  const recentMessages = [
    {
      time: '2 minutes ago',
      message: "Here's a deep cut from 1985 that matches your energy perfectly",
    },
    {
      time: '15 minutes ago',
      message: 'Shifting tempo to match the evening atmosphere',
    },
    {
      time: '1 hour ago',
      message: 'Welcome to the golden hour mix - let the sunset vibes flow',
    },
    {
      time: '2 hours ago',
      message: 'Detected high energy preference - cranking up the BPM',
    },
  ];

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* AI Host Visual Identity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="w-48 h-48 mx-auto mb-8 relative"
          >
            {/* Outer Ring */}
            <motion.div
              animate={{
                rotate: [0, -360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 border-4 border-[#D4AF37]/30 rounded-full"
              style={{
                borderTopColor: '#D4AF37',
                borderRightColor: '#D4AF37',
              }}
            />

            {/* Middle Ring */}
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-4 border-4 border-[#F4D03F]/20 rounded-full"
              style={{
                borderBottomColor: '#F4D03F',
                borderLeftColor: '#F4D03F',
              }}
            />

            {/* Inner Circle with Glow */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(212, 175, 55, 0.3)',
                  '0 0 40px rgba(212, 175, 55, 0.6)',
                  '0 0 20px rgba(212, 175, 55, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-8 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center"
            >
              <Radio size={48} className="text-black" />
            </motion.div>

            {/* Orbiting Particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0"
              >
                <div
                  className="absolute w-2 h-2 bg-[#D4AF37] rounded-full"
                  style={{
                    top: '50%',
                    left: '100%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 10px #D4AF37',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D4AF37]"
          >
            Meet ARIA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-lg"
          >
            Artificial Radio Intelligence Assistant
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {tabs.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              onClick={() => setSelectedTab(id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
                selectedTab === id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black'
                  : 'bg-[#1A1A1A] border border-[#D4AF37]/20 text-white hover:border-[#D4AF37]/50'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedTab === 'personality' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl">
                <h3 className="mb-4 text-[#D4AF37]">Voice Characteristics</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Warmth', value: 85 },
                    { label: 'Energy', value: 72 },
                    { label: 'Intelligence', value: 95 },
                    { label: 'Friendliness', value: 88 },
                  ].map((trait) => (
                    <div key={trait.label}>
                      <div className="flex justify-between mb-2">
                        <span className="text-white/70">{trait.label}</span>
                        <span className="text-[#D4AF37]">{trait.value}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${trait.value}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl">
                <h3 className="mb-4 text-[#D4AF37]">Personality Traits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 bg-[#D4AF37] rounded-full" />
                    <p className="text-white/70">
                      Adapts speaking style based on time of day and music genre
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 bg-[#D4AF37] rounded-full" />
                    <p className="text-white/70">
                      Shares interesting artist facts and music history
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 bg-[#D4AF37] rounded-full" />
                    <p className="text-white/70">
                      Responds to listener mood and energy levels in real-time
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 bg-[#D4AF37] rounded-full" />
                    <p className="text-white/70">
                      Creates smooth transitions between tracks with context
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {selectedTab === 'technology' && (
            <div className="space-y-6">
              <div className="p-8 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#D4AF37]/20 rounded-2xl">
                <h3 className="mb-6 text-[#D4AF37]">AI Technology Stack</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Neural Networks',
                      desc: 'Deep learning models trained on millions of songs',
                    },
                    {
                      title: 'NLP Engine',
                      desc: 'Natural language processing for host commentary',
                    },
                    {
                      title: 'Real-Time Analysis',
                      desc: 'Continuous learning from listener behavior',
                    },
                  ].map((tech) => (
                    <motion.div
                      key={tech.title}
                      whileHover={{ scale: 1.02 }}
                      className="p-6 bg-black/50 border border-[#D4AF37]/10 rounded-xl"
                    >
                      <h4 className="mb-2">{tech.title}</h4>
                      <p className="text-white/60 text-sm">{tech.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl">
                <h3 className="mb-4 text-[#D4AF37]">How ARIA Works</h3>
                <div className="space-y-4">
                  {[
                    'Analyzes audio features: tempo, key, energy, mood, and genre',
                    'Tracks listener interactions: skips, likes, and listening duration',
                    'Considers contextual data: time, weather, and trending patterns',
                    'Generates transitions and commentary using advanced language models',
                    'Continuously learns and adapts to individual preferences',
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-black">{i + 1}</span>
                      </div>
                      <p className="text-white/70 pt-1">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'messages' && (
            <div className="space-y-4">
              {recentMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl hover:border-[#D4AF37]/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <MessageSquare size={18} className="text-black" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-white/80 mb-2">{msg.message}</p>
                      <span className="text-white/40 text-sm">{msg.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {selectedTab === 'interactions' && (
            <div className="p-8 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#D4AF37]/20 rounded-2xl">
              <h3 className="mb-6 text-[#D4AF37]">Interactive Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Request a Song',
                    desc: 'Ask ARIA to play specific tracks or artists',
                    action: 'Send Request',
                  },
                  {
                    title: 'Change the Mood',
                    desc: 'Tell ARIA how you\'re feeling for instant adaptation',
                    action: 'Set Mood',
                  },
                  {
                    title: 'Ask About Music',
                    desc: 'Get instant info about the current track or artist',
                    action: 'Ask Question',
                  },
                  {
                    title: 'Voice Commands',
                    desc: 'Control playback and preferences with your voice',
                    action: 'Enable Voice',
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-black/50 border border-[#D4AF37]/10 rounded-xl hover:border-[#D4AF37]/30 transition-all"
                  >
                    <h4 className="mb-2">{feature.title}</h4>
                    <p className="text-white/60 text-sm mb-4">{feature.desc}</p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black rounded-lg text-sm"
                    >
                      {feature.action}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
