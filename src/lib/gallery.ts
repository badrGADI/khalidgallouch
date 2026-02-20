
import { supabase } from './supabase';
import { GalleryItem } from '../../types';

export const getGalleryItems = async () => {
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*, activities(title)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching gallery items:', error);
    return [];
  }
  
  // Map the join result to flat structure
  return data.map((item: any) => ({
    ...item,
    activity_title: item.activities?.title
  })) as GalleryItem[];
};

export const createGalleryItem = async (item: Omit<GalleryItem, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('gallery_items')
    .insert([item])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteGalleryItem = async (id: string) => {
  const { error } = await supabase
    .from('gallery_items')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
