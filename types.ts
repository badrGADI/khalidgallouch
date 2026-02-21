
export enum ActivityStatus {
  COMPLETED = 'completed',
  UPCOMING = 'upcoming'
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  image: string;
  status: ActivityStatus;
  is_hidden?: boolean;
  gallery?: string[]; // مصفوفة لصور النشاط الخاص
  participants?: number;
  rating?: number;
  duration?: string;
  highlights?: string[];
}

export interface MediaItem {
  id: string;
  url: string;
  title: string;
  type: 'image' | 'video';
  activityTitle: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  external_url?: string;
}


export interface NavLink {
  path: string;
  label: string;
}

export interface Registration {
  id: string;
  created_at: string;
  activity_id: string;
  activity_title: string;
  full_name: string;
  email: string;
  phone: string;
}

export interface GalleryItem {
  id: string;
  created_at: string;
  url: string;
  title: string;
  type: 'image' | 'video';
  category: string;
  activity_id?: string;
  activity_title?: string;
}
