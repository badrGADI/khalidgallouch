-- RUN THIS IN SUPABASE SQL EDITOR --

----------------------------------------------------------------
-- 1. FIX IMAGE UPLOAD ERROR (Missing Storage Bucket)
----------------------------------------------------------------

-- Create the 'activities' bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('activities', 'activities', true)
on conflict (id) do nothing;

-- Allow public access to view images
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'activities' );

-- Allow authenticated uploads
create policy "Authenticated Uploads"
  on storage.objects for insert
  with check ( bucket_id = 'activities' );

----------------------------------------------------------------
-- 2. ENABLE NEW FEATURES
----------------------------------------------------------------

-- A. Dynamic "What will you find" (Highlights)
alter table activities 
add column if not exists highlights text[];

-- B. Activity Registrations
create table if not exists registrations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  activity_id uuid references activities(id) on delete cascade,
  activity_title text not null,
  full_name text not null,
  email text not null,
  phone text not null
);

alter table registrations enable row level security;
create policy "Enable insert for everyone" 
on registrations for insert 
with check (true);
create policy "Enable select for authenticated users only" 
on registrations for select 
using (auth.role() = 'authenticated' or auth.role() = 'anon'); 

-- C. Dynamic Gallery (Activity-Based)
create table if not exists gallery_items (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  url text not null,
  title text default '',
  type text default 'image', -- 'image' or 'video'
  category text default 'general',
  activity_id uuid references activities(id) on delete cascade
);

alter table gallery_items enable row level security;
create policy "Enable public read for gallery" 
on gallery_items for select 
using (true);

create policy "Enable authenticated insert/update/delete for gallery" 
on gallery_items for all 
using (auth.role() = 'authenticated' or auth.role() = 'anon');
