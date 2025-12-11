import { Radio, Compass, User, Calendar, Info, Music } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const links = [
    { id: 'home', label: 'Home', icon: Radio },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'music', label: 'Music Library', icon: Music },
    { id: 'ai-host', label: 'AI Host', icon: User },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => onNavigate('home')}
          className="cursor-pointer"
        >
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F4D03F]">
            wayyFM
          </h3>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              onClick={() => onNavigate(id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentPage === id
                  ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                  : 'text-white/70 hover:text-white'
                }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black rounded-full"
        >
          Sign In
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-around px-4 py-3 border-t border-white/10">
        {links.map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            onClick={() => onNavigate(id)}
            whileTap={{ scale: 0.9 }}
            className={`flex flex-col items-center gap-1 ${currentPage === id ? 'text-[#D4AF37]' : 'text-white/50'
              }`}
          >
            <Icon size={20} />
            <span className="text-xs">{label}</span>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}
