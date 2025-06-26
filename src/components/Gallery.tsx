import React, { useState, useMemo } from 'react';
import { X, Heart, Camera, Filter, ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface GalleryImage {
  id: number;
  url: string;
  category: string;
  title: string;
  date: string;
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const imagesPerPage = 12;

  // Simulando una colección grande de imágenes con diferentes categorías
  const allImages: GalleryImage[] = useMemo(() => {
    const categories = [
      { name: 'compromiso', count: 45 },
      { name: 'preboda', count: 38 },
      { name: 'familia', count: 52 },
      { name: 'amigos', count: 41 },
      { name: 'viajes', count: 35 },
      { name: 'momentos', count: 29 }
    ];

    const baseImages = [
      'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1445253/pexels-photo-1445253.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    ];

    let imageId = 1;
    const images: GalleryImage[] = [];

    categories.forEach(category => {
      for (let i = 0; i < category.count; i++) {
        images.push({
          id: imageId++,
          url: baseImages[i % baseImages.length],
          category: category.name,
          title: `${category.name.charAt(0).toUpperCase() + category.name.slice(1)} ${i + 1}`,
          date: `2023-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`
        });
      }
    });

    return images;
  }, []);

  const categories = [
    { id: 'all', name: 'Todas', count: allImages.length },
    { id: 'compromiso', name: 'Compromiso', count: allImages.filter(img => img.category === 'compromiso').length },
    { id: 'preboda', name: 'Pre-boda', count: allImages.filter(img => img.category === 'preboda').length },
    { id: 'familia', name: 'Familia', count: allImages.filter(img => img.category === 'familia').length },
    { id: 'amigos', name: 'Amigos', count: allImages.filter(img => img.category === 'amigos').length },
    { id: 'viajes', name: 'Viajes', count: allImages.filter(img => img.category === 'viajes').length },
    { id: 'momentos', name: 'Momentos', count: allImages.filter(img => img.category === 'momentos').length }
  ];

  // Filtrar imágenes
  const filteredImages = useMemo(() => {
    let filtered = selectedCategory === 'all' 
      ? allImages 
      : allImages.filter(img => img.category === selectedCategory);

    if (searchTerm) {
      filtered = filtered.filter(img => 
        img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [allImages, selectedCategory, searchTerm]);

  // Paginación
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentImages = filteredImages.slice(startIndex, startIndex + imagesPerPage);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll suave hacia arriba de la galería
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50" id="gallery">
      <div className="max-w-7xl mx-auto">
        {/* Header con estilo vintage */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
            <Camera className="w-12 h-12 text-amber-600 opacity-20" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-light text-amber-900 mb-6 relative">
            <span className="relative z-10 bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
              Álbum de Recuerdos
            </span>
            <div className="absolute inset-0 text-amber-200 transform translate-x-1 translate-y-1 -z-10">
              Álbum de Recuerdos
            </div>
          </h2>
          
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
            <div className="mx-4 w-2 h-2 bg-amber-600 rounded-full"></div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
          </div>
          
          <p className="text-lg text-amber-800 max-w-2xl mx-auto leading-relaxed font-serif italic">
            "Una imagen vale más que mil palabras, pero nuestros recuerdos valen más que mil imágenes"
          </p>
        </div>

        {/* Controles de filtro y búsqueda */}
        <div className="mb-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-amber-200">
          {/* Barra de búsqueda */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
              <input
                type="text"
                placeholder="Buscar en nuestros recuerdos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-amber-300 rounded-full focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors bg-white/90 text-amber-900 placeholder-amber-600"
              />
            </div>
          </div>

          {/* Filtros de categoría */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border-2 ${
                  selectedCategory === category.id
                    ? 'bg-amber-600 text-white border-amber-600 shadow-lg transform scale-105'
                    : 'bg-white/80 text-amber-800 border-amber-300 hover:bg-amber-100 hover:border-amber-400'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  {category.name}
                  <span className="bg-amber-200 text-amber-800 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid de imágenes con estilo vintage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {currentImages.map((image, index) => (
            <div
              key={image.id}
              className="group cursor-pointer relative overflow-hidden"
              onClick={() => setSelectedImage(image.url)}
              style={{
                transform: `rotate(${(index % 4 - 1.5) * 2}deg)`,
              }}
            >
              {/* Marco vintage */}
              <div className="bg-gradient-to-br from-amber-100 to-orange-200 p-4 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-0 border-4 border-amber-200">
                {/* Imagen */}
                <div className="relative overflow-hidden bg-white p-2">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-64 object-cover sepia-[0.3] contrast-110 brightness-95 group-hover:sepia-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-500"
                  />
                  
                  {/* Overlay vintage */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-amber-100/10 group-hover:opacity-0 transition-opacity duration-500"></div>
                  
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Etiqueta vintage */}
                <div className="mt-3 text-center">
                  <h3 className="text-sm font-serif text-amber-900 mb-1">{image.title}</h3>
                  <p className="text-xs text-amber-700 opacity-80">{image.date}</p>
                </div>

                {/* Esquinas decorativas */}
                <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-amber-600 opacity-60"></div>
                <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-amber-600 opacity-60"></div>
                <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-amber-600 opacity-60"></div>
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-amber-600 opacity-60"></div>
              </div>

              {/* Icono de corazón flotante */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-red-500 rounded-full p-2 shadow-lg">
                  <Heart className="w-4 h-4 text-white fill-current" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Información y paginación */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-amber-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Información de resultados */}
            <div className="text-amber-800 font-serif">
              <p className="text-sm">
                Mostrando {startIndex + 1}-{Math.min(startIndex + imagesPerPage, filteredImages.length)} de {filteredImages.length} recuerdos
              </p>
            </div>

            {/* Controles de paginación */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full bg-amber-600 text-white disabled:bg-amber-300 disabled:cursor-not-allowed hover:bg-amber-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? 'bg-amber-600 text-white'
                            : 'bg-white text-amber-800 hover:bg-amber-100 border border-amber-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full bg-amber-600 text-white disabled:bg-amber-300 disabled:cursor-not-allowed hover:bg-amber-700 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal para imagen ampliada */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-5xl max-h-full">
              {/* Marco vintage para la imagen ampliada */}
              <div className="bg-gradient-to-br from-amber-100 to-orange-200 p-6 shadow-2xl border-4 border-amber-300">
                <div className="bg-white p-3">
                  <img
                    src={selectedImage}
                    alt="Imagen ampliada"
                    className="max-w-full max-h-[70vh] object-contain mx-auto"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                
                {/* Esquinas decorativas del modal */}
                <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-amber-700"></div>
                <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-amber-700"></div>
                <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-amber-700"></div>
                <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-amber-700"></div>
              </div>
              
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 bg-amber-600 hover:bg-amber-700 rounded-full p-3 text-white shadow-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;