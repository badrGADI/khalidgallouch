import { supabase } from './supabase';
import { BlogPost } from '../../types';

export const getBlogs = async () => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
  return data as BlogPost[];
};

export const getBlog = async (id: string) => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
  return data as BlogPost;
};

export const createBlog = async (blog: Omit<BlogPost, 'id'>) => {
  const { data, error } = await supabase
    .from('blogs')
    .insert([blog])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateBlog = async (id: string, updates: Partial<BlogPost>) => {
  const { data, error } = await supabase
    .from('blogs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteBlog = async (id: string) => {
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
