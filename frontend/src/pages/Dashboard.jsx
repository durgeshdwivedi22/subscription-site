import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/MockAuthContext';
import { Plus, Trophy, Heart, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { mockCharities, mockScores, mockDrawResults, mockSubscriptionStatus } from '../utils/mockData';
import ScoreForm from '../components/ScoreForm';
import ScoreList from '../components/ScoreList';
import SubscriptionCard from '../components/SubscriptionCard';
import CharitySelector from '../components/CharitySelector';
import DrawResults from '../components/DrawResults';

const Dashboard = () => {
  const { user } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState(mockSubscriptionStatus);
  const [scores, setScores] = useState(mockScores);
  const [charities, setCharities] = useState(mockCharities);
  const [drawResults, setDrawResults] = useState(mockDrawResults);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading
    setLoading(false);
  }, []);

  const handleScoreAdded = (newScore) => {
    setScores(prev => [newScore, ...prev.slice(0, 4)]);
  };

  const handleSubscriptionUpdate = (newStatus) => {
    setSubscriptionStatus(newStatus);
  };

  const handleCharityUpdate = (charityData) => {
    // Update user data in context
    console.log('Charity updated:', charityData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!subscriptionStatus?.is_subscribed) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto" />
          <h1 className="text-3xl font-bold text-gray-900">Subscription Required</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            You need an active subscription to access dashboard features. 
            Choose a plan that works best for you.
          </p>
        </div>
        <SubscriptionCard 
          currentPlan={subscriptionStatus?.plan}
          onUpdate={handleSubscriptionUpdate}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-primary-100">
              Manage your scores, charity, and track your winnings
            </p>
          </div>
          <Trophy className="w-16 h-16 text-primary-200" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Plan</p>
              <p className="text-2xl font-bold text-gray-900 capitalize">
                {subscriptionStatus?.plan || 'None'}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-primary-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Scores</p>
              <p className="text-2xl font-bold text-gray-900">{scores.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Charity</p>
              <p className="text-lg font-bold text-gray-900 truncate">
                {user?.charity || 'Not selected'}
              </p>
            </div>
            <Heart className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Prizes Won</p>
              <p className="text-2xl font-bold text-gray-900">
                {drawResults.filter(r => r.prize_type !== 'none').length}
              </p>
            </div>
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Scores */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Score */}
          <ScoreForm onScoreAdded={handleScoreAdded} />

          {/* Scores List */}
          <ScoreList scores={scores} />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Subscription Status */}
          <SubscriptionCard 
            currentPlan={subscriptionStatus?.plan}
            onUpdate={handleSubscriptionUpdate}
          />

          {/* Charity Selection */}
          <CharitySelector 
            charities={charities}
            selectedCharity={user?.charity}
            contributionPercentage={user?.contribution_percentage}
            onUpdate={handleCharityUpdate}
          />

          {/* Recent Draw Results */}
          <DrawResults results={drawResults.slice(0, 3)} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
