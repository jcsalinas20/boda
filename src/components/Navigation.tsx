import React, { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Heart className={`w-6 h-6 ${isScrolled ? 'text-rose-500' : 'text-rose-500'}`} />
            <span className={`text-lg font-medium ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
              M & JM
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { label: 'Inicio', id: 'home' },
              { label: 'Detalles', id: 'details' },
              { label: 'Galería', id: 'gallery' },
              // { label: 'Historia', id: 'timeline' },
              // { label: 'RSVP', id: 'rsvp' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium hover:text-rose-500 transition-colors ${
                  isScrolled ? 'text-gray-700' : 'text-gray-700 hover:text-rose-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg text-gray-700`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-2xl shadow-xl py-4 border border-gray-100">
            {[
              { label: 'Inicio', id: 'home' },
              { label: 'Detalles', id: 'details' },
              { label: 'Galería', id: 'gallery' },
              // { label: 'Historia', id: 'timeline' },
              // { label: 'RSVP', id: 'rsvp' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;