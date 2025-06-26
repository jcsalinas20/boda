import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface LandingScreenProps {
  onEnter: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onEnter }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isOpening) {
      setIsOpening(true);
      setTimeout(() => {
        setShowInvitation(true);
      }, 1200);
      setTimeout(() => {
        onEnter();
      }, 3500);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex items-center justify-center z-50 overflow-hidden">
      {/* Partículas flotantes de fondo */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Heart className="w-4 h-4 text-rose-300" />
          </div>
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Título inicial */}
        <div className={`mb-12 transition-all duration-1000 ${isOpening ? 'opacity-0 transform -translate-y-8' : 'opacity-100'}`}>
          <h1 className="text-4xl md:text-6xl font-light text-rose-800 mb-4 tracking-wide">
            María & Carlos
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
            <Heart className="w-5 h-5 text-rose-400" />
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
          </div>
          <p className="text-lg text-rose-600 font-light italic mb-8">
            Te invitamos a nuestra boda
          </p>
          <p className="text-sm text-rose-500 animate-pulse">
            Haz clic en el sobre para abrir tu invitación
          </p>
        </div>

        {/* Sobre animado */}
        <div className="relative mx-auto" style={{ width: '300px', height: '200px' }}>
          {/* Sobre base */}
          <div 
            className={`absolute inset-0 cursor-pointer transition-all duration-1000 ${
              isOpening ? 'scale-110' : 'hover:scale-105'
            }`}
            onClick={handleEnvelopeClick}
          >
            {/* Cuerpo del sobre */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-br from-rose-200 to-rose-300 rounded-lg shadow-2xl border-2 border-rose-300">
              {/* Decoración del sobre */}
              <div className="absolute inset-2 border border-rose-400 rounded-md opacity-50"></div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Tapa del sobre */}
            <div 
              className={`absolute top-0 w-full h-24 bg-gradient-to-br from-rose-300 to-rose-400 transition-all duration-1200 ease-out origin-bottom shadow-xl ${
                isOpening ? 'transform -rotate-180 translate-y-8' : ''
              }`}
              style={{
                clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
              }}
            >
              {/* Brillo en la tapa */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" 
                   style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}></div>
            </div>

            {/* Efectos de brillo */}
            {!isOpening && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            )}
          </div>

          {/* Partículas que salen del sobre */}
          {isOpening && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-bounce opacity-80"
                  style={{
                    left: `${45 + Math.random() * 10}%`,
                    top: `${30 + Math.random() * 20}%`,
                    animationDelay: `${0.5 + Math.random() * 0.8}s`,
                    animationDuration: `${1 + Math.random() * 0.5}s`
                  }}
                >
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Invitación que aparece */}
        {showInvitation && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-rose-200 max-w-md mx-4 animate-fadeInUp">
              <div className="text-center">
                <div className="mb-6">
                  <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-light text-gray-800 mb-2">¡Estás Invitado!</h2>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"></div>
                </div>
                
                <div className="space-y-3 text-gray-700 mb-6">
                  <p className="text-lg font-medium">María & Carlos</p>
                  <p className="text-sm">se casan el</p>
                  <p className="text-xl font-semibold text-rose-600">15 de Agosto, 2024</p>
                  <p className="text-sm">4:00 PM</p>
                  <p className="text-sm text-gray-600">Jardín de los Sueños, Madrid</p>
                </div>

                <div className="flex items-center justify-center gap-2 text-rose-500">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm italic">Con amor</span>
                  <Heart className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Texto de carga */}
      {isOpening && !showInvitation && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-3 text-rose-600">
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <span className="ml-3 text-sm font-medium">Abriendo invitación...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingScreen;