import React from 'react';
import { Filter, Check, Clock, X } from 'lucide-react';
import type { ImageFilter } from '../types/Image';

interface FilterBarProps {
  filter: ImageFilter;
  onFilterChange: (filter: ImageFilter) => void;
  totalImages: number;
  filteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onFilterChange,
  totalImages,
  filteredCount
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
        <span className="text-sm text-gray-500">
          Mostrando {filteredCount} de {totalImages} imágenes
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            Estado
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onFilterChange({ ...filter, status: undefined })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                !filter.status
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => onFilterChange({ ...filter, status: 'pending' })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                filter.status === 'pending'
                  ? 'bg-yellow-200 text-yellow-800'
                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              Pendientes
            </button>
            <button
              onClick={() => onFilterChange({ ...filter, status: 'approved' })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                filter.status === 'approved'
                  ? 'bg-green-200 text-green-800'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <Check className="w-4 h-4" />
              Aprobadas
            </button>
            <button
              onClick={() => onFilterChange({ ...filter, status: 'rejected' })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                filter.status === 'rejected'
                  ? 'bg-red-200 text-red-800'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              <X className="w-4 h-4" />
              Rechazadas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};