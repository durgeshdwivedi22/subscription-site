import React, { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';

const ScoreForm = ({ onScoreAdded }) => {
  const [formData, setFormData] = useState({
    score: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validateScore = (score) => {
    const num = parseInt(score);
    return !isNaN(num) && num >= 1 && num <= 45;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateScore(formData.score)) {
      setError('Score must be between 1 and 45');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Mock score submission - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newScore = {
        id: Date.now().toString(),
        score: parseInt(formData.score),
        date: formData.date
      };

      onScoreAdded(newScore);
      
      // Reset form
      setFormData({
        score: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add Score</h2>
        <Plus className="w-5 h-5 text-gray-400" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="score" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Score (1-45)
            </label>
            <input
              type="number"
              id="score"
              name="score"
              min="1"
              max="45"
              required
              value={formData.score}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Enter score"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full"
        >
          {isLoading ? 'Adding...' : 'Add Score'}
        </button>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>Note: Only your last 5 scores are stored. Adding a new score will remove the oldest one if you already have 5.</p>
        </div>
      </form>
    </div>
  );
};

export default ScoreForm;
