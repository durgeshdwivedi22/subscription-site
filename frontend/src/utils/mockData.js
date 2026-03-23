// Mock data for demo purposes
export const mockCharities = [
  {
    id: '1',
    name: 'Children Education Fund',
    description: 'Providing quality education to underprivileged children'
  },
  {
    id: '2',
    name: 'Environmental Conservation',
    description: 'Protecting forests and wildlife habitats'
  },
  {
    id: '3',
    name: 'Healthcare for All',
    description: 'Medical assistance for those in need'
  },
  {
    id: '4',
    name: 'Senior Care Support',
    description: 'Supporting elderly citizens with healthcare and companionship'
  },
  {
    id: '5',
    name: 'Animal Rescue Foundation',
    description: 'Rescuing and rehabilitating abandoned animals'
  }
];

export const mockScores = [
  {
    id: '1',
    score: 12,
    date: '2024-03-15'
  },
  {
    id: '2',
    score: 8,
    date: '2024-03-10'
  },
  {
    id: '3',
    score: 15,
    date: '2024-03-05'
  }
];

export const mockDrawResults = [
  {
    id: '1',
    match_count: 3,
    prize_type: 'small',
    created_at: '2024-03-14T10:00:00Z',
    draws: {
      id: '1',
      numbers: [5, 12, 23, 34, 45],
      date: '2024-03-14T10:00:00Z'
    }
  },
  {
    id: '2',
    match_count: 0,
    prize_type: 'none',
    created_at: '2024-03-07T10:00:00Z',
    draws: {
      id: '2',
      numbers: [8, 16, 24, 32, 40],
      date: '2024-03-07T10:00:00Z'
    }
  }
];

export const mockSubscriptionStatus = {
  is_subscribed: false,
  plan: null,
  expiry_date: null,
  is_expired: false
};
