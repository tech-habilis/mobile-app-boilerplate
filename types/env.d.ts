/**
 * ENVIRONMENT VARIABLES
 *
 * Declare your environment variables here for TypeScript intellisense.
 *
 * Add your variables to the `.env` file:
 * EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
 * EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
 * EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID=your_google_oauth_client_id
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly EXPO_PUBLIC_SUPABASE_URL: string;
      readonly EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: string;
      readonly EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID?: string;
    }
  }
}
