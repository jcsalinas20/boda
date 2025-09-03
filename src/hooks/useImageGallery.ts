import { useState, useCallback, useMemo, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ImageItem, ImageFilter } from '../types/Image';

type TagUsage = {
  tag: string;
  usage_count: number;
};

export const useImageGallery = () => {
  
  const getImagesFromBucket = async (
    filter: ImageFilter
  ): Promise<ImageItem[]> => {
    try {
      let query = supabase
        .from("images")
        .select("*")
        .order("created_at", { ascending: false });

      if (filter.status && filter.status.trim() !== "") {
        query = query.eq("status", filter.status);
      }

      const { data, error } = await query;

      if (error) throw error;
      if (!data || data.length === 0) return [];

      return data.map((file) => ({
        id: file.id,
        url: file.public_url,
        pendingPath: file.pending_path ?? null,
        name: file.file_name,
        status: file.status,
        tags: file.tags ?? [],
        uploadDate: new Date(file.created_at),
      } as ImageItem));
    } catch (err) {
      console.error("Error obteniendo imágenes:", err);
      return [];
    }
  };

  const updateImageStatus = useCallback(async (image: ImageItem, status: ImageItem['status']) => {
    try {
      const { data, error } = await supabase
        .from("images")
        .update({ status })
        .eq("id", image.id)
        .select();

      if (error) {
        console.error("Error actualizando imagen:", error.message);
        return null;
      }

      return data;
    } catch (err) {
      console.error("Error:", err);
    }
  }, []);

  // -------------------------------------
  // 3️⃣ Actualizar tags
  // -------------------------------------
  const updateImageTags = useCallback(async (id: string, tags: string[]) => {
    const { error } = await supabase
      .from('images')
      .update({ tags })
      .eq('id', id);

    if (error) {
      console.error('Error updating image tags:', error.message);
      return;
    }
  }, []);

  // -------------------------------------
  // 5️⃣ Filtrar imágenes según FilterBar
  // -------------------------------------

  const availableTags = useCallback(async (): Promise<TagUsage[]> => {
    const { data, error } = await supabase.rpc("get_tags_usage");

    if (error) {
      console.error("Error fetching tags usage:", error);
      return [];
    }
    
    return data ?? [];
  }, []);

  return {
    getImagesFromBucket,
    updateImageStatus,
    // updateImageStatus,
    updateImageTags,
    availableTags
  };
};
