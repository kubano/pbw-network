export interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  technologies: string[];
  project_url?: string;
  github_url?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  message: string;
  project_type?: string;
}

export interface ContactSubmission extends ContactForm {
  id: string;
  created_at: string;
  status: 'pending' | 'responded' | 'archived';
}
