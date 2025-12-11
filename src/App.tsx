import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { DiscoverPage } from './components/DiscoverPage';
import { AIHostPage } from './components/AIHostPage';
import { SchedulePage } from './components/SchedulePage';
import { AboutPage } from './components/AboutPage';
import { MusicLibraryPage } from './components/MusicLibraryPage';
import { MusicPlayer } from './components/MusicPlayer';
import { MusicProvider } from './contexts/MusicContext';
import { songs } from './data/songs';
import './styles/globals.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'discover':
        return <DiscoverPage />;
      case 'ai-host':
        return <AIHostPage />;
      case 'schedule':
        return <SchedulePage />;
      case 'about':
        return <AboutPage />;
      case 'music':
        return <MusicLibraryPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <MusicProvider songs={songs}>
      <div className="min-h-screen bg-black text-white">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="pt-20 md:pt-24 pb-24">
          {renderPage()}
        </main>
        <MusicPlayer />
      </div>
    </MusicProvider>
  );
}
