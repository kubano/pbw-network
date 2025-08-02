import { useEffect, useState } from 'react';

// Environment variable for reCAPTCHA site key
const RECAPTCHA_SITE_KEY = '6LeJ9mMiAAAAADLCrRo5KY7-VD96Zb26L7IrTLf6';

export const useRecaptcha = () => {
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState(null);

  useEffect(() => {
    // Check if site key is configured
    if (!RECAPTCHA_SITE_KEY) {
      setRecaptchaError('reCAPTCHA site key is not configured');
      return;
    }

    // Check if reCAPTCHA is already loaded
    if (window.grecaptcha?.ready) {
      window.grecaptcha.ready(() => setIsRecaptchaLoaded(true));
      return;
    }

    // Helper function to check if reCAPTCHA is ready
    const checkRecaptchaReady = () => {
      if (window.grecaptcha?.ready) {
        window.grecaptcha.ready(() => setIsRecaptchaLoaded(true));
        return true;
      }
      return false;
    };

    // Load reCAPTCHA script dynamically
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Poll for grecaptcha to be ready
      const pollInterval = setInterval(() => {
        if (checkRecaptchaReady()) {
          clearInterval(pollInterval);
        }
      }, 100);
      
      // Clear interval after 10 seconds to prevent infinite polling
      setTimeout(() => clearInterval(pollInterval), 10000);
    };
    
    script.onerror = () => {
      setRecaptchaError('Failed to load reCAPTCHA script');
    };
    
    document.head.appendChild(script);
  }, []);

  const executeRecaptcha = async (action = 'contact_form') => {
    try {
      if (!RECAPTCHA_SITE_KEY) {
        throw new Error('reCAPTCHA site key is not configured');
      }

      if (!isRecaptchaLoaded) {
        throw new Error('reCAPTCHA is not loaded yet');
      }

      // Execute reCAPTCHA v3
      const token = await new Promise((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action })
            .then(resolve)
            .catch(reject);
        });
      });

      setRecaptchaError(null);
      return token;
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error);
      setRecaptchaError(error.message);
      return null;
    }
  };

  return {
    isRecaptchaLoaded,
    recaptchaError,
    executeRecaptcha
  };
};

export default useRecaptcha;
