# Environment Variables for reCAPTCHA Integration

## Frontend Environment Variables (.env.local)

Create a `.env.local` file in your project root with:

```env
# Google reCAPTCHA v3 Site Key (Public key - safe to expose in frontend)
VITE_RECAPTCHA_SITE_KEY=your_site_key_here
```

## Backend Environment Variables (Azure Function App Settings)

Add these environment variables to your Azure Function App:

```env
# Google reCAPTCHA v3 Secret Key (Private key - keep secure!)
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Existing SendGrid configuration
SENDGRID_API_KEY=your_sendgrid_api_key
CONTACT_EMAIL=support@pbwweb.com
FROM_EMAIL=noreply@pbwweb.com
```

## Getting reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click "Create" to register a new site
3. Choose "reCAPTCHA v3"
4. Add your domains:
   - For development: `localhost`
   - For production: `your-domain.com`
5. Get your Site Key (public) and Secret Key (private)

## Local Development Setup

1. Create `.env.local` in project root:
   ```bash
   echo "VITE_RECAPTCHA_SITE_KEY=your_site_key_here" > .env.local
   ```

2. Add the secret key to your local Azure Functions settings:
   ```bash
   # In the api/ directory, create local.settings.json if it doesn't exist
   {
     "IsEncrypted": false,
     "Values": {
       "AzureWebJobsStorage": "",
       "FUNCTIONS_WORKER_RUNTIME": "node",
       "SENDGRID_API_KEY": "your_sendgrid_key",
       "RECAPTCHA_SECRET_KEY": "your_secret_key_here",
       "CONTACT_EMAIL": "support@pbwweb.com",
       "FROM_EMAIL": "noreply@pbwweb.com"
     }
   }
   ```

## Azure Deployment

Set environment variables in Azure Portal:
1. Go to your Function App in Azure Portal
2. Navigate to Configuration → Application settings
3. Add new application settings:
   - `RECAPTCHA_SECRET_KEY`: Your secret key
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `CONTACT_EMAIL`: support@pbwweb.com
   - `FROM_EMAIL`: noreply@pbwweb.com

## Testing

1. Test form submission with valid data
2. Check Azure Function logs for reCAPTCHA verification results
3. Verify emails are sent successfully
4. Test with different reCAPTCHA scores if needed

## Security Notes

- Never expose the reCAPTCHA secret key in frontend code
- The site key can be public (it's meant to be visible)
- reCAPTCHA v3 scores range from 0.0 (bot) to 1.0 (human)
- Current threshold is set to 0.5 (can be adjusted as needed)
