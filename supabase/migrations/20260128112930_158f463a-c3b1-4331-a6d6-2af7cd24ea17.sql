-- Add user_id column to mentors table
ALTER TABLE public.mentors ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add user_id column to seekers table  
ALTER TABLE public.seekers ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop old RLS policies
DROP POLICY IF EXISTS "Anyone can insert mentors" ON public.mentors;
DROP POLICY IF EXISTS "Anyone can view mentors" ON public.mentors;
DROP POLICY IF EXISTS "Anyone can insert seekers" ON public.seekers;
DROP POLICY IF EXISTS "Anyone can view seekers" ON public.seekers;

-- Create new RLS policies for mentors
CREATE POLICY "Anyone can view mentors" 
ON public.mentors 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert their own mentor profile" 
ON public.mentors 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mentor profile" 
ON public.mentors 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own mentor profile" 
ON public.mentors 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create new RLS policies for seekers
CREATE POLICY "Anyone can view seekers" 
ON public.seekers 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert their own seeker profile" 
ON public.seekers 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own seeker profile" 
ON public.seekers 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own seeker profile" 
ON public.seekers 
FOR DELETE 
USING (auth.uid() = user_id);