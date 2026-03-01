# Supabase Setup Instructions

## Create team_members Table

Kör följande SQL i Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor → New Query):

```sql
-- Create team_members table
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  initials VARCHAR(10),
  color VARCHAR(50) DEFAULT 'bg-pink-500',
  image_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access"
ON public.team_members
FOR SELECT
USING (true);

-- Create policy to allow inserts (you can make this more restrictive)
CREATE POLICY "Allow inserts"
ON public.team_members
FOR INSERT
WITH CHECK (true);

-- Create policy to allow updates
CREATE POLICY "Allow updates"
ON public.team_members
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Create policy to allow deletes
CREATE POLICY "Allow deletes"
ON public.team_members
FOR DELETE
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_team_members_created_at ON public.team_members(created_at);
```

## Create team-photos Storage Bucket

1. Gå till Supabase Dashboard → Storage
2. Klicka "New Bucket"
3. Namn: `team-photos`
4. Sätt Public → **ON** (så att bilderna är åtkomliga)
5. Klicka "Create Bucket"

## Verifiera Supabase Connection

Kontrollera att `src/lib/supabase.ts` har rätt:
- `supabaseUrl`: `https://gtatcccdcxsytcdokgbg.supabase.co`
- `supabaseKey`: En gyldig anon-nyckel

Dessa är redan inställda i koden.

## Testa

1. Starta dev-servern: `npm run dev`
2. Gå till `/admin` och logga in (lösenord: `helpinghand2024`)
3. Lägg till en ny medarbetare med bild
4. Bild bör uploadea till `team-photos`-bucketen
5. Data bör sparas i `team_members`-tabellen
6. Gå hem eller till personalsidan för att se medarbetaren dyker upp

Om något går fel, kontrollera:
- Browser DevTools → Console för felmeddelanden
- Supabase Dashboard → Logs för API-fel
- Säkerställ att `team-photos` är **public** och `team_members`-tabellen har RLS-policies

