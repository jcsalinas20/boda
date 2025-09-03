import React, { useState, useCallback } from 'react';
import { Check, X, Tag, Calendar } from 'lucide-react';
import type { ImageItem } from '../types/Image';

interface ImageCardProps {
  image: ImageItem;
  onUpdateStatus: (image: ImageItem, status: ImageItem['status']) => void;
  onUpdateTags: (id: string, tags: string[]) => void;
  onImageClick: (image: ImageItem) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  onUpdateStatus,
  onUpdateTags,
  onImageClick
}) => {
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const getStatusColor = (status: ImageItem['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: ImageItem['status']) => {
    switch (status) {
      case 'approved': return <Check className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      default: return null;
    }
  };

  const handleAddTag = useCallback(() => {
    if (tagInput.trim() && !image.tags.includes(tagInput.trim())) {
      onUpdateTags(image.id, [...image.tags, tagInput.trim()]);
      setTagInput('');
    }
  }, [tagInput, image.tags, image.id, onUpdateTags]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    onUpdateTags(image.id, image.tags.filter(tag => tag !== tagToRemove));
  }, [image.tags, image.id, onUpdateTags]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  }, [handleAddTag]);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={image.url}
          alt={image.name}
          className="w-full h-48 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
          onClick={() => onImageClick(image)}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        
        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-1 ${getStatusColor(image.status)}`}>
          {getStatusIcon(image.status)}
          {image.status.charAt(0).toUpperCase() + image.status.slice(1)}
        </div>
      </div>

      <div className="p-4">
        {/* Image Info */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 truncate">{image.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <Calendar className="w-4 h-4" />
            {image.uploadDate.toLocaleDateString()}
          </div>
        </div>

        {/* Status Controls */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Estado:</p>
          <div className="flex gap-2">
            <button
              onClick={() => onUpdateStatus(image, 'approved')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                image.status === 'approved'
                  ? 'bg-green-500 text-white'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <Check className="w-4 h-4 inline mr-1" />
              Aprobar
            </button>
            <button
              onClick={() => onUpdateStatus(image, 'pending')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                image.status === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              }`}
            >
              Pendiente
            </button>
            <button
              onClick={() => onUpdateStatus(image, 'rejected')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                image.status === 'rejected'
                  ? 'bg-red-500 text-white'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              <X className="w-4 h-4 inline mr-1" />
              Rechazar
            </button>
          </div>
        </div>

        {/* Tags Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Tag className="w-4 h-4" />
              Etiquetas:
            </p>
            <button
              onClick={() => setIsEditingTags(!isEditingTags)}
              className="text-blue-500 hover:text-blue-600 text-sm font-medium"
            >
              {isEditingTags ? 'Guardar' : 'Editar'}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            {image.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
              >
                {tag}
                {isEditingTags && (
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-blue-600 hover:text-blue-800 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
          </div>

          {isEditingTags && (
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nueva etiqueta..."
                className="flex-1 px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAddTag}
                disabled={!tagInput.trim()}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};