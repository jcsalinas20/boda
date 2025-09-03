import { useState } from 'react';
import LandingScreen from './components/LandingScreen';
import Navigation from './components/Navigation';
import CountdownTimer from './components/CountdownTimer';
import Gallery from './components/Gallery';
import EventDetails from './components/EventDetails';
import AdminPanel from './components/AdminPanel';
import { UploadScreen } from './components/UploadScreen';

function App() {
  const [showLanding, setShowLanding] = useState(() => {
    const firstTime = localStorage.getItem('firstTime');
    return firstTime === null ? true : firstTime !== 'false';
  });
  if (window.location.pathname.includes('admin')) {
    return <AdminPanel />;
  }

  if (window.location.pathname.includes('upload')) {
    return <UploadScreen
      />
  }

  const handleEnterSite = () => {
    window.localStorage.setItem('firstTime', 'false');
    setShowLanding(false);
  };

  if (showLanding) {
    return <LandingScreen onEnter={handleEnterSite} />;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        <section id="home">
          <CountdownTimer />
        </section>

        <EventDetails />
        <Gallery />
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-light mb-4">Mónica & Jose Manuel</h3>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"></div>
          </div>
          
          <p className="text-gray-400 mb-6">
            "El amor no es solo mirarse el uno al otro, sino mirar juntos en la misma dirección."
          </p>
          
          <p className="text-sm text-gray-500">
            © 2025 Mónica & Jose Manuel. Con amor para nuestros seres queridos.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;