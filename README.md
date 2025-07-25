# PBW Network - Modern Web Showcase

# PBW NETWORK

A modern, responsive website for PBW NETWORK built with Next.js, Supabase, and Azure Functions.

## Features

- **Modern Design**: Clean, responsive design with Tailwind CSS and Framer Motion animations
- **Project Showcase**: Dynamic project portfolio with filtering and detailed views
- **Contact System**: Contact form with Azure Functions backend
- **Database Integration**: Supabase for project data storage
- **Static Export**: Optimized for Azure Static Web Apps deployment
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Backend**: Azure Functions (for contact form)
- **Deployment**: Azure Static Web Apps
- **Forms**: React Hook Form

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Azure account (for Functions and Static Web Apps)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kubano/pbw-network.git
   cd pbw-network/src
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your actual values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_AZURE_FUNCTION_URL=your_azure_function_url
   ```

4. **Set up Supabase database**
   
   Create the following tables in your Supabase database:

   ```sql
   -- Projects table
   CREATE TABLE projects (
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

   -- Contact submissions table
   CREATE TABLE contact_submissions (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     company TEXT,
     message TEXT NOT NULL,
     project_type TEXT,
     status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'archived')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
   );

   -- Enable Row Level Security
   ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
   ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

   -- Allow public read access to projects
   CREATE POLICY "Projects are publicly readable" ON projects
     FOR SELECT USING (true);

   -- Allow insert access to contact submissions
   CREATE POLICY "Anyone can submit contact forms" ON contact_submissions
     FOR INSERT WITH CHECK (true);
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the site.

## Azure Functions Setup

The contact form uses Azure Functions for backend processing.

### Local Development

1. **Install Azure Functions Core Tools**
   ```bash
   npm install -g azure-functions-core-tools@4 --unsafe-perm true
   ```

2. **Navigate to API directory and install dependencies**
   ```bash
   cd ../api
   npm install
   ```

3. **Run the Functions locally**
   ```bash
   npm start
   ```

   The Functions will be available at `http://localhost:7071`

### Deployment

The Azure Functions will be deployed automatically with Azure Static Web Apps.

## Static Web Apps Deployment

This project is configured for Azure Static Web Apps deployment.

### Prerequisites

- Azure account
- GitHub repository

### Setup

1. **Create Azure Static Web App**
   - Go to Azure Portal
   - Create new Static Web App
   - Connect to your GitHub repository
   - Set build configuration:
     - App location: `/src`
     - API location: `/api`
     - Output location: `out`

2. **Configure Environment Variables**
   
   In Azure Portal, add these environment variables to your Static Web App:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **The GitHub Action will automatically deploy on push to main branch**

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── projects/          # Projects page
│   └── api/               # API routes
├── components/            # React components
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── ProjectsSection.tsx
│   └── ContactSection.tsx
├── lib/                   # Utilities
│   └── supabase.ts       # Supabase client
├── types/                 # TypeScript types
│   └── database.ts
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json

api/                       # Azure Functions
├── contact/
│   ├── index.ts          # Contact form handler
│   └── function.json     # Function binding
├── host.json
├── package.json
└── tsconfig.json
```

## Customization

### Adding Projects

1. **Via Supabase Dashboard**: Add projects directly to the `projects` table
2. **Via API**: Create an admin interface (future enhancement)

### Styling

- Edit `tailwind.config.js` for design system changes
- Update `app/globals.css` for custom CSS
- Modify component styles in individual component files

### Contact Form

- Update `api/contact/index.ts` to integrate with your email service
- Modify `components/ContactSection.tsx` for form changes
- Add additional fields as needed

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `NEXT_PUBLIC_AZURE_FUNCTION_URL` | Azure Functions endpoint | Optional |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript check

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email hello@pbw.network or create an issue in the GitHub repository.
