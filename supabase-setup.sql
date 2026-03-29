-- ==============================================================================
-- VISENTRA - Supabase Setup Script
-- Jalankan script ini di SQL Editor pada dashboard Supabase
-- ==============================================================================

-- 1. Create table for user settings (API Keys)
CREATE TABLE IF NOT EXISTS public.user_settings (
    user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
    gemini_api_key TEXT,
    deapi_api_key TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create table for history (if not exists)
CREATE TABLE IF NOT EXISTS public.history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    product_image TEXT NOT NULL,
    product_info TEXT NOT NULL,
    result JSONB NOT NULL,
    generated_images JSONB DEFAULT '{}'::jsonb
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.history ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies for user_settings
-- Users can only view their own settings
CREATE POLICY "Users can view own settings" 
    ON public.user_settings FOR SELECT 
    USING (auth.uid() = user_id);

-- Users can insert their own settings
CREATE POLICY "Users can insert own settings" 
    ON public.user_settings FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own settings
CREATE POLICY "Users can update own settings" 
    ON public.user_settings FOR UPDATE 
    USING (auth.uid() = user_id);

-- 5. Create RLS Policies for history
-- Users can only view their own history
CREATE POLICY "Users can view own history" 
    ON public.history FOR SELECT 
    USING (auth.uid() = user_id);

-- Users can insert their own history
CREATE POLICY "Users can insert own history" 
    ON public.history FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own history
CREATE POLICY "Users can update own history" 
    ON public.history FOR UPDATE 
    USING (auth.uid() = user_id);

-- Users can delete their own history
CREATE POLICY "Users can delete own history" 
    ON public.history FOR DELETE 
    USING (auth.uid() = user_id);

-- ==============================================================================
-- MIGRATION: 
-- Jika tabel history sudah ada sebelumnya (tanpa user_id),
-- Anda mungkin perlu menambahkan kolom user_id dan memodifikasi data lama.
-- Hapus komentar di bawah ini jika memang diperlukan:
-- ==============================================================================

-- ALTER TABLE public.history ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
-- UPDATE public.history SET user_id = 'MASUKKAN_UUID_ADMIN_SINI' WHERE user_id IS NULL;
-- ALTER TABLE public.history ALTER COLUMN user_id SET NOT NULL;

-- ==============================================================================
-- 6. SETUP STORAGE BUCKET "posters"
-- Script untuk membuat bucket dan membolehkan pengguna mengupload
-- ==============================================================================

-- Bikin public bucket "posters" 
INSERT INTO storage.buckets (id, name, public) 
VALUES ('posters', 'posters', true)
ON CONFLICT (id) DO NOTHING;

-- Bikin policy untuk akses SELECT / BACA (Bebas untuk semuanya)
CREATE POLICY "Public Access" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'posters');

-- Bikin policy untuk akses INSERT / UPLOAD (Hanya untuk user yang login)
CREATE POLICY "Auth Users can Insert" 
    ON storage.objects FOR INSERT 
    WITH CHECK (
      bucket_id = 'posters' 
      AND auth.role() = 'authenticated'
    );

-- Bikin policy untuk akses UPDATE (Opsional)
CREATE POLICY "Auth Users can Update own files" 
    ON storage.objects FOR UPDATE 
    USING (
      bucket_id = 'posters' 
      AND auth.role() = 'authenticated'
    );
