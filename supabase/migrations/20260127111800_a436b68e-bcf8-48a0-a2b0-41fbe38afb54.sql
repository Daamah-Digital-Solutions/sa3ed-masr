-- Create mentors table
CREATE TABLE public.mentors (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  name text NOT NULL,
  title text,
  company text,
  expertise text[] NOT NULL,
  help_types text[],
  linkedin text,
  email text NOT NULL,
  message text
);

-- Enable RLS on mentors (public read, anyone can insert)
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;

-- Anyone can view mentors
CREATE POLICY "Anyone can view mentors"
  ON public.mentors FOR SELECT
  USING (true);

-- Anyone can insert mentors
CREATE POLICY "Anyone can insert mentors"
  ON public.mentors FOR INSERT
  WITH CHECK (true);

-- Create seekers table
CREATE TABLE public.seekers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  name text NOT NULL,
  startup text,
  stage text,
  needs text[],
  description text NOT NULL,
  email text NOT NULL,
  linkedin text
);

-- Enable RLS on seekers (public read, anyone can insert)
ALTER TABLE public.seekers ENABLE ROW LEVEL SECURITY;

-- Anyone can view seekers
CREATE POLICY "Anyone can view seekers"
  ON public.seekers FOR SELECT
  USING (true);

-- Anyone can insert seekers
CREATE POLICY "Anyone can insert seekers"
  ON public.seekers FOR INSERT
  WITH CHECK (true);