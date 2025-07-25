-- Supabase Database Setup for PBW Network
-- Run these commands in your Supabase SQL Editor

-- 1. Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  project_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  project_type TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 4. Create policies for public access
-- Allow public read access to projects
CREATE POLICY IF NOT EXISTS "Projects are publicly readable" ON projects
  FOR SELECT USING (true);

-- Allow insert access to contact submissions
CREATE POLICY IF NOT EXISTS "Anyone can submit contact forms" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- 5. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Create trigger for projects table
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 7. Insert sample projects (optional)
INSERT INTO projects (title, description, image_url, technologies, project_url, github_url, featured) VALUES
  (
    'D.A.P. Data Acquisition Portal',
    'A cutting-edge cloud-based solution designed for gas meter repair and utility contractor companies, featuring meter test data acquisition, service order management, and real-time customer portal access. Empowers businesses with digital transformation through workflow automation and secure data management.',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    ARRAY['Cloud Platform', 'Data Analytics', 'Real-time Dashboard', 'API Integration', 'Security Compliance', 'Workflow Automation'],
    'https://dap.pbw.network/',
    NULL,
    true
  ),
  (
    'Public Housing Authority Web Presence',
    'A comprehensive cloud-ready web marketing solution specifically designed for Public Housing Authorities (PHAs). Features modern responsive design, accessibility compliance, content management systems, and integrated communication tools to help PHAs effectively engage with residents and stakeholders while maintaining WCAG 2.1 AA standards.',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
    ARRAY['Responsive Design', 'CMS Integration', 'Accessibility Compliance', 'Cloud Hosting', 'SEO Optimization', 'WCAG 2.1'],
    NULL,
    NULL,
    true
  ),
  (
    'Enterprise Web Solutions',
    'Custom enterprise-grade web applications and digital transformation solutions for businesses across various industries. Focus on scalable architecture, modern technologies, and user-centric design with emphasis on performance, security, and maintainability.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    ARRAY['Enterprise Architecture', 'Cloud Integration', 'Custom Development', 'Modern Frameworks', 'Security', 'Performance Optimization'],
    NULL,
    NULL,
    true
  ),
  (
    'Utility Management Systems',
    'Specialized solutions for utility companies focusing on operational efficiency, data management, and regulatory compliance. Built with industry-specific requirements and modern cloud infrastructure.',
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    ARRAY['Utility Systems', 'Data Management', 'Compliance', 'Cloud Infrastructure', 'Real-time Monitoring'],
    NULL,
    NULL,
    false
  ),
  (
    'Government Web Applications',
    'Secure, accessible, and compliant web applications for government agencies and public sector organizations. Focus on transparency, citizen engagement, and efficient service delivery.',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
    ARRAY['Government Compliance', 'Accessibility', 'Security', 'Citizen Portals', 'Digital Services', 'Section 508'],
    NULL,
    NULL,
    false
  ),
  (
    'Business Intelligence Dashboards',
    'Data-driven dashboards and analytics platforms that transform raw business data into actionable insights. Features real-time reporting, custom visualizations, and automated reporting capabilities.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    ARRAY['Business Intelligence', 'Data Visualization', 'Real-time Analytics', 'Custom Reporting', 'Dashboard Design'],
    NULL,
    NULL,
    false
  )
ON CONFLICT DO NOTHING;
