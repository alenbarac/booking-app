import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://wcsoecomjrgzhclgkylr.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indjc29lY29tanJnemhjbGdreWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwNzc3OTksImV4cCI6MjAxNjY1Mzc5OX0.7GraF7IjmfshC3g2l4WREwT7XTS_rwt2DOIcf0zE2Wc'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
