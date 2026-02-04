/**
 * SUPABASE DATABASE TYPES
 *
 * This is a placeholder file. You should generate your own types by running:
 *
 *   supabase gen types typescript --schema public > utilities/supabase/database.types.ts
 *
 * Make sure to:
 * 1. Create your Supabase project
 * 2. Set up your database schema
 * 3. Run the command above to generate types specific to your schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Add your tables here, for example:
      // user_profiles: {
      //   Row: { ... }  // The data structure
      //   Insert: { ... }  // For inserts
      //   Update: { ... }  // For updates
      // }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      // Add your enums here
    }
  }
}
