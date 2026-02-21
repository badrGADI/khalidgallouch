-- Add missing date column to blogs table
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS date TEXT;

-- Update existing rows if any to have a default date (optional)
UPDATE blogs SET date = timezone('utc'::text, created_at)::text WHERE date IS NULL;

-- Make it NOT NULL for future entries if desired
-- ALTER TABLE blogs ALTER COLUMN date SET NOT NULL;
