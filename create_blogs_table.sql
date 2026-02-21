-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  image TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT DEFAULT 'عام'
);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public to read blogs
CREATE POLICY "Allow public read-only access" ON blogs
  FOR SELECT USING (true);

-- Create policy to allow authenticated users (admins) all access
-- Note: Assuming you have a simple admin auth or want to allow all for now
-- In a real app, you'd check for admin role/email
CREATE POLICY "Allow admins all access" ON blogs
  USING (true)
  WITH CHECK (true);
