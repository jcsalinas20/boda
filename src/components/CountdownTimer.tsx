import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Fecha de la boda - puedes cambiar esta fecha
  const weddingDate = new Date('2025-09-20T12:45:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-rose-50 to-pink-100 min-h-screen flex items-center justify-center py-20">
      <div className="text-center max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-light text-rose-800 mb-4 tracking-tight">
            Mónica & Jose Manuel
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-rose-600 font-light italic">
            Nos casamos
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 mb-12 border border-rose-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Días', value: timeLeft.days },
              { label: 'Horas', value: timeLeft.hours },
              { label: 'Minutos', value: timeLeft.minutes },
              { label: 'Segundos', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-2xl p-4 md:p-6 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl md:text-4xl font-bold mb-2">{item.value}</div>
                  <div className="text-sm md:text-base opacity-90">{item.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-rose-700">
            <div className="flex items-center justify-center gap-3">
              <Calendar className="w-5 h-5 text-rose-500" />
              <span className="text-lg font-medium">20 de Septiembre, 2025</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-5 h-5 text-rose-500" />
              <span className="text-lg font-medium">12:45 PM</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <MapPin className="h-5 text-rose-500 w-[47px] md:w-auto" />
              <span className="text-lg font-medium">Ajuntament de, Plaça de la Vila, 46, 08760 Martorell, Barcelona</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;