# SendGrid & Supabase Integration Setup Guide

This guide will help you set up SendGrid email integration and Supabase database integration for your PBW NETWORK contact form and projects.

## Step 1: Create SendGrid Account

1. Go to [SendGrid.com](https://sendgrid.com)
2. Sign up for a free account (100 emails/day)
3. Verify your email address

## Step 2: Verify Sender Identity

### Option A: Single Sender Verification (Recommended for testing)
1. Go to Settings > Sender Authentication > Single Sender Verification
2. Click "Create New Sender"
3. Fill in your details:
   - From Name: `PBW NETWORK`
   - From Email: `noreply@pbwweb.com` (or your preferred email)
   - Reply To: `support@pbwweb.com`
   - Company Name: `PBW NETWORK`
   - Address: Your business address
4. Click "Create" and verify the email address

### Option B: Domain Authentication (Recommended for production)
1. Go to Settings > Sender Authentication > Domain Authentication
2. Click "Authenticate Your Domain"
3. Enter your domain: `pbwweb.com`
4. Follow the DNS setup instructions

## Step 3: Create API Key

1. Go to Settings > API Keys
2. Click "Create API Key"
3. Choose "Restricted Access"
4. Select these permissions:
   - Mail Send: **Full Access**
   - Template Engine: **Read Access** (optional)
5. Name it: `pbw-network-contact-form`
6. Click "Create & View"
7. **IMPORTANT**: Copy the API key immediately (you won't see it again!)

## Step 4: Configure Environment Variables

### For Local Development
Update your `api/local.settings.json`:
```json
{
  "Values": {
    "SENDGRID_API_KEY": "SG.your-actual-api-key-here",
    "FROM_EMAIL": "noreply@pbwweb.com",
    "NOTIFICATION_EMAIL": "support@pbwweb.com"
  }
}
```

### For Azure Production
Add these secrets to your GitHub repository:

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add these repository secrets:
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `FROM_EMAIL`: `noreply@pbwweb.com` (or your verified sender email)
   - `NOTIFICATION_EMAIL`: `support@pbwweb.com` (where you want to receive notifications)

## Step 5: Test the Integration

### Local Testing
1. Start your Azure Functions locally:
   ```bash
   cd api
   npm run start
   ```

2. Test with curl:
   ```bash
   curl -X POST http://localhost:7071/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "company": "Test Company",
       "message": "This is a test message",
       "project_type": "Enterprise Web Application"
     }'
   ```

3. Check your email for both notification and auto-response emails

### Production Testing
After deployment, test using your live website contact form.

## Email Templates

The integration includes two professional email templates:

### 1. Notification Email (to PBW NETWORK team)
- Professional HTML layout
- All form submission details
- Contact information prominently displayed
- Next steps guidance

### 2. Auto-Response Email (to the user)
- Branded PBW NETWORK design
- Thank you message
- Submission confirmation details
- Company information and contact details
- Professional signature

## Troubleshooting

### Common Issues

1. **401 Unauthorized**
   - Check your API key is correct
   - Ensure API key has Mail Send permissions

2. **403 Forbidden**
   - Verify your sender email address
   - Check domain authentication status

3. **Emails not being delivered**
   - Check SendGrid Activity Feed
   - Verify recipient email addresses
   - Check spam folders

4. **Local development issues**
   - Ensure `local.settings.json` is properly formatted
   - Check environment variable names match exactly

### Monitoring

1. **SendGrid Dashboard**
   - Monitor email delivery statistics
   - Check for bounces or spam reports
   - View activity feed for troubleshooting

2. **Azure Function Logs**
   - Check function execution logs
   - Monitor for errors or warnings
   - Verify environment variables are loaded

## Security Best Practices

1. **Never commit API keys** - Use environment variables only
2. **Restrict API key permissions** - Only grant necessary access
3. **Monitor usage** - Set up alerts for unusual activity
4. **Regular rotation** - Update API keys periodically
5. **Domain verification** - Use domain authentication in production

## SendGrid Pricing

- **Free Tier**: 100 emails/day forever
- **Essentials**: $14.95/month for 50,000 emails
- **Pro**: $89.95/month for 1.5M emails

The free tier should be sufficient for most small business contact forms.

## Supabase Integration

### Step 1: Get Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy these values:
   - **Project URL**: `https://your-project.supabase.co`
   - **Anon/Public Key**: `eyJ...` (for frontend)
   - **Service Role Key**: `eyJ...` (for backend/Azure Functions)

### Step 2: Configure Supabase Environment Variables

#### For Local Development
Update your `api/local.settings.json`:
```json
{
  "Values": {
    "SUPABASE_URL": "https://your-project.supabase.co",
    "SUPABASE_SERVICE_ROLE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### For Azure Production
Add these secrets to your GitHub repository:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Your service role key (not the anon key!)

### Step 3: Database Schema

The Azure Functions expect these tables in your Supabase database:

```sql
-- Projects table (already exists)
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

-- Contact submissions table (already exists)
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
```

### Step 4: API Endpoints

The integration provides these API endpoints:

#### Projects API (`/api/projects`)
- `GET /api/projects` - Get all projects
- `GET /api/projects?featured=true` - Get featured projects only
- `GET /api/projects?limit=6` - Limit number of results

#### Contact API (`/api/contact`)
- `POST /api/contact` - Submit contact form (saves to database + sends emails)

## SendGrid Setup

## Support

- SendGrid Documentation: https://docs.sendgrid.com/
- SendGrid Support: https://support.sendgrid.com/
- Supabase Documentation: https://supabase.com/docs
- Azure Functions Documentation: https://docs.microsoft.com/azure/azure-functions/
