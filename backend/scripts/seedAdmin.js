const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config();

const supabaseUrl = process.env.DATABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing database credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  try {
    const adminEmail = 'admin@golfcharity.com';
    const adminPassword = 'admin123';
    const adminName = 'Admin User';

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    const { data, error } = await supabase
      .from('users')
      .insert([{
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        is_subscribed: true,
        plan: 'yearly'
      }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        console.log('Admin user already exists');
      } else {
        throw error;
      }
    } else {
      console.log('Admin user created successfully!');
      console.log('Email:', adminEmail);
      console.log('Password:', adminPassword);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();
