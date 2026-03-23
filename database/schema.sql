-- Golf Charity Platform Database Schema

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_subscribed BOOLEAN DEFAULT FALSE,
    plan VARCHAR(50) CHECK (plan IN ('monthly', 'yearly')),
    expiry_date TIMESTAMP,
    charity VARCHAR(255),
    contribution_percentage INTEGER DEFAULT 10,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scores table
CREATE TABLE scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER NOT NULL CHECK (score >= 1 AND score <= 45),
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Draws table
CREATE TABLE draws (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    numbers INTEGER[] NOT NULL CHECK (array_length(numbers, 1) = 5),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Results table
CREATE TABLE results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    draw_id UUID NOT NULL REFERENCES draws(id) ON DELETE CASCADE,
    match_count INTEGER NOT NULL CHECK (match_count >= 0 AND match_count <= 5),
    prize_type VARCHAR(50) CHECK (prize_type IN ('none', 'small', 'medium', 'jackpot')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Charities table (dummy data)
CREATE TABLE charities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert dummy charities
INSERT INTO charities (name, description) VALUES
('Children Education Fund', 'Providing quality education to underprivileged children'),
('Environmental Conservation', 'Protecting forests and wildlife habitats'),
('Healthcare for All', 'Medical assistance for those in need'),
('Senior Care Support', 'Supporting elderly citizens with healthcare and companionship'),
('Animal Rescue Foundation', 'Rescuing and rehabilitating abandoned animals');

-- Indexes for better performance
CREATE INDEX idx_scores_user_id ON scores(user_id);
CREATE INDEX idx_scores_date ON scores(date DESC);
CREATE INDEX idx_results_user_id ON results(user_id);
CREATE INDEX idx_results_draw_id ON results(draw_id);
CREATE INDEX idx_draws_date ON draws(date DESC);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Scores policies
CREATE POLICY "Users can view own scores" ON scores
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own scores" ON scores
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own scores" ON scores
    FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Results policies
CREATE POLICY "Users can view own results" ON results
    FOR SELECT USING (auth.uid()::text = user_id::text);

-- Admin policies (bypass RLS)
-- Admin users will be handled in application logic
