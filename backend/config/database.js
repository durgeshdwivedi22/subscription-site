const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.DATABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing database credentials');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

module.exports = supabase;
