
import { supabase } from './supabase';
import { Activity } from '../../types';

export const getActivities = async (includeHidden = false) => {
  let query = supabase
    .from('activities')
    .select('*');

  if (!includeHidden) {
    query = query.or('is_hidden.is.null,is_hidden.eq.false');
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
  return data as Activity[];
};

export const getActivity = async (id: string) => {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching activity:', error);
    return null;
  }
  return data as Activity;
};

export const createActivity = async (activity: Omit<Activity, 'id'>) => {
  const { data, error } = await supabase
    .from('activities')
    .insert([activity])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateActivity = async (id: string, updates: Partial<Activity>) => {
  const { data, error } = await supabase
    .from('activities')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteActivity = async (id: string) => {
  const { error } = await supabase
    .from('activities')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const uploadImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('activities')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from('activities').getPublicUrl(filePath);
  return data.publicUrl;
};
