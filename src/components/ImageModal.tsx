import React from 'react';
import { X } from 'lucide-react';
import type { ImageItem } from '../types/Image';

interface ImageModalProps {
  image: ImageItem | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-4xl max-h-full bg-white rounded-xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>
        
        <img
          src={image.url}
          alt={image.name}
          className="max-w-full max-h-[80vh] object-contain"
        />
        
        <div className="p-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{image.name}</h2>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Estado: <span className="font-medium capitalize">{image.status}</span></span>
            <span>Fecha: {image.uploadDate.toLocaleDateString()}</span>
            {image.size && <span>Tamaño: {(image.size / 1024 / 1024).toFixed(2)} MB</span>}
          </div>
          
          {image.tags.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Etiquetas:</p>
              <div className="flex flex-wrap gap-2">
                {image.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};