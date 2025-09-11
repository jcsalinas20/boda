import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Send, Check, Trash2, ArrowBigLeft } from 'lucide-react';

import { supabase } from "../lib/supabase";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  tags: string[];
}

interface UploadScreenProps {
}

export const UploadScreen: React.FC<UploadScreenProps> = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    addFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(file => 
      file.type.startsWith('image/')
    );
    
    addFiles(files);
  }, []);

  const addFiles = useCallback((files: File[]) => {
    const newUploadedFiles: UploadedFile[] = files.map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      tags: []
    }));

    setUploadedFiles(prev => [...prev, ...newUploadedFiles]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  }, []);

  const updateFileTags = useCallback((id: string, tags: string[]) => {
    setUploadedFiles(prev => prev.map(file => 
      file.id === id ? { ...file, tags } : file
    ));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (uploadedFiles.length === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate upload delay
    for (const uploadedFile of uploadedFiles) {

      const fileName = `${Date.now()}_${uploadedFile.file.name.replace(/\s+/g, "_")}`;
      const galleryPath = `images/${fileName}`;

    const { data, error } = await supabase.storage
      .from("gallery")
      .upload(galleryPath, uploadedFile.file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // Generar URL pública
    const { data: publicUrlData } = supabase.storage
      .from("gallery")
      .getPublicUrl(galleryPath);

      const publicUrl = publicUrlData.publicUrl;

      const { error: dbErr } = await supabase.from("images").insert({
        file_name: fileName,
        public_path: galleryPath,
        public_url: publicUrl,
        status: "pending",
      });

      if (dbErr) throw dbErr;
    }
    
    // Clean up object URLs
    uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    setUploadedFiles([]);
    setIsSubmitting(false);
  }, [uploadedFiles]);

  const clearAll = useCallback(() => {
    uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    setUploadedFiles([]);
  }, [uploadedFiles]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center mb-8 gap-4">
          <button
            onClick={() => window.location.href = "/"}
            className="flex items-center justify-center gap-2 px-4 py-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-all duration-200 w-full sm:w-auto"
          >
            <ArrowBigLeft className="w-10 h-10" />
          </button>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold font-sans text-gray-800">
              Subir Imágenes
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Selecciona y organiza tus imágenes antes de enviarlas
            </p>
          </div>
          
          {uploadedFiles.length > 0 && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={clearAll}
                className="flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 w-full sm:w-auto"
              >
                <Trash2 className="w-5 h-5" />
                Limpiar Todo
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar {uploadedFiles.length} Imagen{uploadedFiles.length !== 1 ? 'es' : ''}
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Upload Area */}
        <div
          className={`
            border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 mb-8
            ${isDragOver 
              ? 'border-blue-400 bg-blue-50 scale-105' 
              : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <Upload className={`w-20 h-20 mb-6 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`} />
            <h3 className="text-2xl font-sans font-semibold text-gray-700 mb-3">
              Arrastra y Suelta tus Imágenes Aquí
            </h3>
            <p className="text-gray-500 mb-8 text-lg">
              O haz clic en el botón para seleccionar múltiples archivos
            </p>
            <label className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg cursor-pointer transition-colors duration-200 inline-flex items-center gap-3 text-lg font-medium">
              <ImageIcon className="w-6 h-6" />
              Seleccionar Imágenes
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Uploaded Files Preview */}
        {uploadedFiles.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-sans font-bold text-gray-800 flex items-center gap-3">
                <ImageIcon className="w-7 h-7 text-blue-500" />
                Imágenes Seleccionadas ({uploadedFiles.length})
              </h2>
              <div className="text-sm text-gray-500">
                Total: {(uploadedFiles.reduce((acc, file) => acc + file.file.size, 0) / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {uploadedFiles.map((uploadedFile) => (
                <UploadedImageCard
                  key={uploadedFile.id}
                  uploadedFile={uploadedFile}
                  onRemove={removeFile}
                  onUpdateTags={updateFileTags}
                />
              ))}
            </div>
          </div>
        )}

        {uploadedFiles.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-sans font-semibold text-gray-600 mb-2">
              No hay imágenes seleccionadas
            </h3>
            <p className="text-gray-500">
              Arrastra archivos o usa el botón de selección para comenzar
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface UploadedImageCardProps {
  uploadedFile: UploadedFile;
  onRemove: (id: string) => void;
  onUpdateTags: (id: string, tags: string[]) => void;
}

const UploadedImageCard: React.FC<UploadedImageCardProps> = ({
  uploadedFile,
  onRemove,
  onUpdateTags
}) => {
  const [tagInput, setTagInput] = useState('');
  const [isEditingTags, setIsEditingTags] = useState(false);

  const handleAddTag = useCallback(() => {
    if (tagInput.trim() && !uploadedFile.tags.includes(tagInput.trim())) {
      onUpdateTags(uploadedFile.id, [...uploadedFile.tags, tagInput.trim()]);
      setTagInput('');
    }
  }, [tagInput, uploadedFile.tags, uploadedFile.id, onUpdateTags]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    onUpdateTags(uploadedFile.id, uploadedFile.tags.filter(tag => tag !== tagToRemove));
  }, [uploadedFile.tags, uploadedFile.id, onUpdateTags]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  }, [handleAddTag]);

  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img
          src={uploadedFile.preview}
          alt={uploadedFile.file.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => onRemove(uploadedFile.id)}
          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
          {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold font-sans text-gray-800 truncate mb-2" title={uploadedFile.file.name}>
          {uploadedFile.file.name}
        </h3>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{uploadedFile.file.type}</span>
          <div className="flex items-center gap-1 text-green-600">
            <Check className="w-3 h-3" />
            Listo
          </div>
        </div>
      </div>
    </div>
  );
};