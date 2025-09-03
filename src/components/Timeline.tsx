import React from 'react';
import { Heart, Coffee, Gift, BellRing as Ring } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
}

const Timeline: React.FC = () => {
  const events: TimelineEvent[] = [
    {
      date: "Enero 2020",
      title: "Nos conocimos",
      description: "Un encuentro casual en la biblioteca de la universidad cambió nuestras vidas para siempre. Entre libros y sonrisas, comenzó nuestra hermosa historia.",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      date: "Marzo 2020",
      title: "Primera cita",
      description: "Nuestra primera cita oficial fue en aquel pequeño café en el centro de la ciudad. Hablamos durante horas y supimos que esto era especial.",
      icon: <Coffee className="w-6 h-6" />,
    },
    {
      date: "Diciembre 2021",
      title: "Viviendo juntos",
      description: "Decidimos dar el siguiente paso y mudarnos juntos. Nuestro primer hogar, lleno de amor, risas y sueños compartidos.",
      icon: <Gift className="w-6 h-6" />,
    },
    {
      date: "San Valentín 2023",
      title: "La propuesta",
      description: "En el mismo lugar donde nos conocimos, Carlos se arrodilló y me pidió ser su esposa. Por supuesto, dije ¡SÍ!",
      icon: <Ring className="w-6 h-6" />,
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-sage-50 to-white" id="timeline">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            Nuestra Historia de Amor
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Cada gran historia de amor tiene un comienzo. Esta es la nuestra, 
            desde el primer encuentro hasta el día que diremos "Sí, acepto".
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-rose-300 via-pink-300 to-rose-300"></div>

          {events.map((event, index) => (
            <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              {/* Contenido */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-sm font-medium text-rose-500 mb-2">{event.date}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{event.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{event.description}</p>
                </div>
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg z-10 hover:scale-110 transition-transform duration-300">
                {event.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;