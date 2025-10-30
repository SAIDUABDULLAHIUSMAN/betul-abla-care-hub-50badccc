-- Create storage buckets for orphans and boreholes photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('orphans', 'orphans', true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('boreholes', 'boreholes', true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('outreach', 'outreach', true);

-- Create storage policies for orphans bucket
CREATE POLICY "Orphan photos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'orphans');

CREATE POLICY "Authenticated users can upload orphan photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'orphans' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update orphan photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'orphans' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete orphan photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'orphans' AND auth.uid() IS NOT NULL);

-- Create storage policies for boreholes bucket
CREATE POLICY "Borehole photos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'boreholes');

CREATE POLICY "Authenticated users can upload borehole photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'boreholes' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update borehole photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'boreholes' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete borehole photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'boreholes' AND auth.uid() IS NOT NULL);

-- Create storage policies for outreach bucket
CREATE POLICY "Outreach photos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'outreach');

CREATE POLICY "Authenticated users can upload outreach photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'outreach' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update outreach photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'outreach' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete outreach photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'outreach' AND auth.uid() IS NOT NULL);