import React, { useState, useMemo } from 'react';
import { X, Heart, Camera, Filter, ChevronLeft, ChevronRight, Search, DownloadCloud } from 'lucide-react';
import { useImageGallery } from '../hooks/useImageGallery';

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
  const imagesPerPage = 12;
  const { availableTags, getImagesFromBucket } = useImageGallery();

  // Simulando una colección grande de imágenes con diferentes categorías
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);

  React.useEffect(() => {
    let imageId = 1;
    const fetchTagsAndImages = async () => {     
      const tags = await availableTags();
      const images: GalleryImage[] = await getImagesFromBucket({ status: "approved" }).then(images => {
        const mappedImages: GalleryImage[] = images.map((img, idx) => ({
          id: typeof img.id === 'number' ? img.id : idx + 1,
          url: img.url,
          category: Array.isArray(img.tags) ? img.tags.join(', ') : img.tags,
          title: img.name,
          date: typeof img.uploadDate === 'string' ? img.uploadDate : img.uploadDate?.toString() ?? ''
        }));
        return mappedImages;
      });

      // tags.map(tag => {
        // for (let i = 0; i < images.length; i++) {
          console.log(images);
          
          // images.push({
          //   id: imageId++,
          //   url: "images[i].url",
          //   // category: tags.join(', '),
          //   category: "asdf",
          //   // title: `${tags.join(', ').charAt(0).toUpperCase() + tags.join(', ').slice(1)} ${i + 1}`,
          //   title: "",
          //   date: `2023-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`
          // });
        // }
      // });

      setAllImages(images);
    };

    fetchTagsAndImages();
  }, []);

  const categories = [
    { id: 'all', name: 'Todas', count: allImages.length },
    { id: 'compromiso', name: 'Compromiso', count: allImages.filter(img => img.category.includes('compromiso')).length },
    { id: 'preboda', name: 'Pre-boda', count: allImages.filter(img => img.category.includes('preboda')).length },
    { id: 'familia', name: 'Familia', count: allImages.filter(img => img.category.includes('familia')).length },
    { id: 'amigos', name: 'Amigos', count: allImages.filter(img => img.category.includes('amigos')).length },
    { id: 'asdf', name: 'ASDF', count: allImages.filter(img => img.category.includes('asdf')).length },
    { id: 'momentos', name: 'Momentos', count: allImages.filter(img => img.category.includes('momentos')).length }
  ];

  // Filtrar imágenes
  const filteredImages = useMemo(() => {
    let filtered = selectedCategory === 'all' 
      ? allImages 
      : allImages.filter(img => img.category.includes(selectedCategory));

    return filtered;
  }, [allImages, selectedCategory]);

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

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  async function downloadImage(event: React.MouseEvent<HTMLButtonElement>, url: string, filename: string): Promise<void> {
      event.stopPropagation();
      event.preventDefault();
      try {
        const response = await fetch(url);
        const blob = await response.blob();

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error("Error al descargar la imagen:", error);
      }
    }
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50" id="gallery">
      <div className="max-w-7xl mx-auto">
        {/* Header con estilo vintage */}
        <div className="text-center mb-16 relative">          
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
              <button
                className="download-btn absolute top-0 right-0 z-50 flex items-center justify-center w-10 h-10 rounded-bl-xl bg-blue-200 hover:bg-blue-300 transition"
                onClick={(e) => downloadImage(e, image.url, image.title)}
              >
                <DownloadCloud className="w-6 h-6 text-blue-700" />
              </button>
              <div className="bg-gradient-to-br from-amber-100 to-orange-200 p-4 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-0 border-4 border-amber-200">
                <div className="relative overflow-hidden bg-white p-2">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-64 object-cover sepia-[0.3] contrast-110 brightness-95 group-hover:sepia-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-amber-100/10 group-hover:opacity-0 transition-opacity duration-500"></div>
                  
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="mt-3 text-center">
                  <h3 className="text-sm font-serif text-amber-900 mb-1 truncate">{image.title}</h3>
                  <p className="text-xs text-amber-700 opacity-80">{formatDate(image.date)}</p>
                </div>

                <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-amber-600 opacity-60"></div>
                <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-amber-600 opacity-60"></div>
                <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-amber-600 opacity-60"></div>
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-amber-600 opacity-60"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Información y paginación */}
        {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-amber-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-amber-800 font-serif">
              <p className="text-sm">
                Mostrando {startIndex + 1}-{Math.min(startIndex + imagesPerPage, filteredImages.length)} de {filteredImages.length} recuerdos
              </p>
            </div>

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
        </div> */}

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