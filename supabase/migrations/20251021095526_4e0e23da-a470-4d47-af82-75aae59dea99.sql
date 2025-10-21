-- Create profiles table for user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT DEFAULT 'staff',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create orphans table
CREATE TABLE IF NOT EXISTS public.orphans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  age INTEGER,
  location TEXT,
  school_name TEXT,
  grade_level TEXT,
  school_fees_covered BOOLEAN DEFAULT false,
  photo_url TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on orphans
ALTER TABLE public.orphans ENABLE ROW LEVEL SECURITY;

-- Create orphans policies
CREATE POLICY "Staff can view all orphans"
  ON public.orphans FOR SELECT
  USING (true);

CREATE POLICY "Staff can insert orphans"
  ON public.orphans FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can update orphans"
  ON public.orphans FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can delete orphans"
  ON public.orphans FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create boreholes table
CREATE TABLE IF NOT EXISTS public.boreholes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL,
  community_name TEXT NOT NULL,
  depth_meters NUMERIC,
  completion_date DATE,
  beneficiaries_count INTEGER,
  photo_url TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on boreholes
ALTER TABLE public.boreholes ENABLE ROW LEVEL SECURITY;

-- Create boreholes policies
CREATE POLICY "Staff can view all boreholes"
  ON public.boreholes FOR SELECT
  USING (true);

CREATE POLICY "Staff can insert boreholes"
  ON public.boreholes FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can update boreholes"
  ON public.boreholes FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can delete boreholes"
  ON public.boreholes FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create outreach_activities table
CREATE TABLE IF NOT EXISTS public.outreach_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  location TEXT NOT NULL,
  date DATE NOT NULL,
  beneficiaries_count INTEGER,
  description TEXT,
  photo_url TEXT,
  status TEXT DEFAULT 'pending',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on outreach_activities
ALTER TABLE public.outreach_activities ENABLE ROW LEVEL SECURITY;

-- Create outreach_activities policies
CREATE POLICY "Staff can view all outreach activities"
  ON public.outreach_activities FOR SELECT
  USING (true);

CREATE POLICY "Staff can insert outreach activities"
  ON public.outreach_activities FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can update outreach activities"
  ON public.outreach_activities FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can delete outreach activities"
  ON public.outreach_activities FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_orphans
  BEFORE UPDATE ON public.orphans
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_boreholes
  BEFORE UPDATE ON public.boreholes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_outreach
  BEFORE UPDATE ON public.outreach_activities
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'staff'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();