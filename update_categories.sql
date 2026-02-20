-- Migrate Activity Categories
-- Run this in your Supabase SQL Editor to update existing records

-- Update 'activities' table
UPDATE activities SET category = 'أنشطة سياسية' WHERE category IN ('أنشطة سياسية', 'Political');
UPDATE activities SET category = 'أنشطة جمعوية' WHERE category IN ('أنشطة جمعوية', 'Associative');
UPDATE activities SET category = 'تكوينات' WHERE category IN ('تكوينات', 'Trainings', 'تعليم', 'أنشطة تعليمية');

-- If you have specific old categories you want to map:
-- UPDATE activities SET category = 'أنشطة سياسية' WHERE category = 'Old Category Name';

-- Verify changes
SELECT DISTINCT category FROM activities;
