import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gtatcccdcxsytcdokgbg.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ptnp3Kh47Mb74nuPz5tRlA_AXNrqdGt';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for our database tables
export interface TeamMember {
  id?: string;
  name: string;
  role?: string; // Ej obligatorisk
  category?: string[];
  initials: string;
  color: string;
  image_url?: string;
  bio?: string;
  created_at?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at?: string;
}
