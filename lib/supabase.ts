import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export interface HistoryRecord {
  id: string;
  created_at: string;
  product_image: string;
  product_info: string;
  result: any; // GeminiResponse
  generated_images?: Record<number, string>;
  user_id?: string;
}
