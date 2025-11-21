-- Create films table
CREATE TABLE public.films (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.films ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own films"
ON public.films
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can view published films"
ON public.films
FOR SELECT
USING (status = 'published');

CREATE POLICY "Users can create their own films"
ON public.films
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own films"
ON public.films
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own films"
ON public.films
FOR DELETE
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_films_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_films_updated_at
BEFORE UPDATE ON public.films
FOR EACH ROW
EXECUTE FUNCTION public.update_films_updated_at();