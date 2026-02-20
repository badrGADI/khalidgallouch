-- RUN THIS IN SUPABASE SQL EDITOR --

-- The table 'gallery_items' already exists but is missing the 'activity_id' column.
-- We must ALTER it to add the column and the link to activities.

alter table gallery_items 
add column if not exists activity_id uuid references activities(id) on delete cascade;

-- Force a schema cache reload by updating the comment
comment on table gallery_items is 'Gallery items linked to activities';

-- Verify the column exists
select column_name, data_type 
from information_schema.columns 
where table_name = 'gallery_items';
