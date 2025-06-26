import React, { useState } from 'react';
import LandingScreen from './components/LandingScreen';
import Navigation from './components/Navigation';
import CountdownTimer from './components/CountdownTimer';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import EventDetails from './components/EventDetails';
import RSVP from './components/RSVP';

function App() {
  const [showLanding, setShowLanding] = useState(true);

  const handleEnterSite = () => {
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
        
        <Timeline />
        <Gallery />
        <EventDetails />
        <RSVP />
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-light mb-4">María & Carlos</h3>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"></div>
          </div>
          
          <p className="text-gray-400 mb-6">
            "El amor no es solo mirarse el uno al otro, sino mirar juntos en la misma dirección."
          </p>
          
          <p className="text-sm text-gray-500">
            © 2024 María & Carlos. Con amor para nuestros seres queridos.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;