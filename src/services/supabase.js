import { createClient } from '@supabase/supabase-js';

/**
 * SECURITY NOTE FOR REPOSITORY VIEWERS:
 *
 * The Supabase anon key below is intentionally public and safe to expose.
 * This is the recommended approach by Supabase for client-side applications.
 *
 * Security is enforced through:
 * - Row Level Security (RLS) policies on the database
 * - User authentication and authorization
 * - Server-side validation in Supabase
 *
 * The anon key only allows access to data that RLS policies permit.
 * Without proper authentication and RLS policies, this key cannot access sensitive data.
 *
 * Learn more: https://supabase.com/docs/guides/auth/row-level-security
 */
export const supabaseUrl = 'https://lhhmhrgrvalvdtbthxvu.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoaG1ocmdydmFsdmR0YnRoeHZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NDA0OTIsImV4cCI6MjA1NTExNjQ5Mn0.EaxmzCOx5IHnIWO5JTbkCrWae4uKUNaSvntd5oo2Nfk';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
