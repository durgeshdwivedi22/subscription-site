// Temporary database config for demo without real database
const supabase = {
  from: (table) => ({
    select: (columns) => ({
      eq: (column, value) => ({
        single: () => Promise.resolve({ data: null, error: { message: 'Demo mode - no database connected' } }),
        order: (column, options) => Promise.resolve({ data: [], error: null })
      }),
      insert: (data) => ({
        select: () => Promise.resolve({ data: null, error: { message: 'Demo mode - no database connected' } })
      }),
      update: (data) => ({
        eq: (column, value) => ({
          select: () => Promise.resolve({ data: null, error: { message: 'Demo mode - no database connected' } })
        })
      }),
      delete: () => ({
        eq: (column, value) => Promise.resolve({ error: { message: 'Demo mode - no database connected' } })
      })
    })
  })
};

module.exports = supabase;
