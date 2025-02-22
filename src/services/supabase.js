import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://lhhmhrgrvalvdtbthxvu.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoaG1ocmdydmFsdmR0YnRoeHZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NDA0OTIsImV4cCI6MjA1NTExNjQ5Mn0.EaxmzCOx5IHnIWO5JTbkCrWae4uKUNaSvntd5oo2Nfk';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
