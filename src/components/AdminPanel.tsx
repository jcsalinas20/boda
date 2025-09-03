import { useEffect, useMemo, useState } from 'react';
import { Images, BarChart3, Upload as UploadIcon } from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import { ImageCard } from './ImageCard';
import { ImageModal } from './ImageModal';
import { FilterBar } from './FilterBar';
import { useImageGallery } from '../hooks/useImageGallery';
import type { ImageFilter, ImageItem } from '../types/Image';

function AdminPanel() {
  const [allImages, setAllImages] = useState<ImageItem[]>([]);
  const [filter, setFilter] = useState<ImageFilter>({});

  const {
    getImagesFromBucket,
    updateImageStatus,
    // filter,
    // setFilter,
    // updateImageStatus,
    updateImageTags,
    // addImages
  } = useImageGallery();

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    getImages();
  }, [filter]);

  async function getImages() {
    const urls = await getImagesFromBucket(filter);
    setAllImages(urls);
  }

  const stats = useMemo(() => ({
    total: allImages.length,
    approved: allImages.filter(img => img.status === 'approved').length,
    pending: allImages.filter(img => img.status === 'pending').length,
    rejected: allImages.filter(img => img.status === 'rejected').length
  }), [allImages]);

  const filteredImages = useMemo(() => {
    return allImages.filter(image => {
      if (filter.status && image.status !== filter.status) return false;
      return true;
    });
  }, [allImages, filter]);

  const updateStatus = async (image: ImageItem, status: ImageItem['status']) => {
    await updateImageStatus(image, status);
    await getImages();
  };

  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Images className="w-10 h-10 text-blue-500" />
            <h1 className="text-4xl font-bold text-gray-800">Galería de Imágenes</h1>
          </div>
          <p className="text-lg text-gray-600">
            Gestiona y organiza tu colección de imágenes con estados de aprobación y etiquetas
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <BarChart3 className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-8 h-8 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-sm text-gray-600">Aprobadas</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pendientes</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-8 h-8 bg-red-100 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            </div>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-gray-600">Rechazadas</div>
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          totalImages={stats.total}
          filteredCount={filteredImages.length}
        />

        {/* Gallery Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Images className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-800">Galería de Imágenes</h2>
          </div>
          
          {allImages.length === 0 ? (
            <div className="text-center py-12">
              <Images className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No hay imágenes para mostrar
              </h3>
              <p className="text-gray-500">
                {stats.total === 0 
                  ? 'Sube algunas imágenes para comenzar' 
                  : 'Ajusta los filtros para ver más imágenes'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allImages.map((image) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  onUpdateStatus={updateStatus}
                  onUpdateTags={updateImageTags}
                  onImageClick={setSelectedImage}
                />
              ))}
            </div>
          )}
        </div>

        {/* Image Modal */}
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      </div>
    </div>
  );
}

export default AdminPanel;