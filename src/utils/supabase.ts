
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://hgzqeznmrsfjdudqsezb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnenFlem5tcnNmamR1ZHFzZXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0NDg0NTgsImV4cCI6MjAyMzAyNDQ1OH0.PXxyqIk-K6VEN68XJ7uG8OA2E0F3OASzUkSNcNqXprI')

export default supabase;