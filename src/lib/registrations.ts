
import { supabase } from './supabase';
import { Registration } from '../../types';

export const createRegistration = async (registration: Omit<Registration, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('registrations')
    .insert([registration])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getRegistrations = async () => {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching registrations:', error);
    return [];
  }
  return data as Registration[];
};
