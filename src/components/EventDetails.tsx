import React from 'react';
import { MapPin, Clock, Phone, Mail, Car, Gift, QrCode } from 'lucide-react';

const EventDetails: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-white" id="details">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            Detalles del Evento
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Toda la información importante para nuestro día especial
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Ceremonia */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 shadow-lg border border-rose-100">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Ceremonia</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-rose-500 rounded-full p-2 mt-1">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Hora</h4>
                  <p className="text-gray-600">12:45 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-rose-500 rounded-full p-2 mt-1">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Ubicación</h4>
                  <p className="text-gray-600">Ajuntament de, Plaça de la Vila, 46,</p>
                  <p className="text-gray-600">08760 Martorell, Barcelona</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-rose-500 rounded-full p-2 mt-1">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Estacionamiento</h4>
                  <p className="text-gray-600">Estacionamiento gratuito disponible</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recepción */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg border border-green-100">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Comida</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 rounded-full p-2 mt-1">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Hora</h4>
                  <p className="text-gray-600">14:15 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-600 rounded-full p-2 mt-1">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Ubicación</h4>
                  <p className="text-gray-600">Km.4, Ctra. Martorell – Gelida,</p>
                  <p className="text-gray-600">08769 Castellví de Rosanes, Barcelona</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-600 rounded-full p-2 mt-1">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Estacionamiento</h4>
                  <p className="text-gray-600">Estacionamiento gratuito en el restaurante</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información de contacto */}
        <div className="mt-12 bg-gray-50 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">¿Quieres aportar las fotos que has tomado?</h3>
          <h4 className="text-2xl font-semibold text-gray-800 mb-6"></h4>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-1">
                <div className="flex flex-col md:flex-row items-center gap-1">
                  <span className="font-bold text-lg text-gray-700 text-center md:text-left">
                    Envialas a:
                  </span>
                  <div className="flex items-center gap-1">
                    <Mail className="w-5 h-5 text-rose-500" />
                    <span className="text-gray-700 break-all">
                      <a href="mailto:boda.monica.josemanuel@gmail.com?subject=Imágenes boda Mónica y Jose Manuel">
                        boda.monica.josemanuel@gmail.com
                      </a>
                    </span>
                  </div>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-rose-500" /> 
                <span className='text-gray-700'>+34 691 72 19 11</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg text-gray-700">O sube tus imágenes
                <a href='/upload'>
                  <button className='btn-upload'>Aquí</button>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;