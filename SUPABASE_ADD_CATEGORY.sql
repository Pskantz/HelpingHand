-- Add multi-category column to team_members table
ALTER TABLE public.team_members
ADD COLUMN IF NOT EXISTS category TEXT[];

-- If the column exists as a text type, convert existing values to a one-element array.
ALTER TABLE public.team_members
ALTER COLUMN category TYPE TEXT[]
USING CASE
  WHEN pg_typeof(category) = 'text'::regtype THEN ARRAY[category]::TEXT[]
  WHEN pg_typeof(category) = 'character varying'::regtype THEN ARRAY[category]::TEXT[]
  ELSE category::TEXT[]
END;
