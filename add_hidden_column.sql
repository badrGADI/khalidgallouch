-- Add is_hidden column to activities table
ALTER TABLE activities ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT FALSE;

-- Update existing activities to be visible
UPDATE activities SET is_hidden = FALSE WHERE is_hidden IS NULL;
