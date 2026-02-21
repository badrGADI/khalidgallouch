-- Add external_url column to blogs table
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS external_url TEXT;
