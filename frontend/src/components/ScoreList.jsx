import React, { useState } from 'react';
import { Trash2, Calendar, TrendingUp } from 'lucide-react';

const ScoreList = ({ scores }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (scoreId) => {
    if (!confirm('Are you sure you want to delete this score?')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/scores/${scoreId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete score');
      }

      // Refresh the scores list
      window.location.reload();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!scores || scores.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center space-y-4">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">No scores yet</h3>
            <p className="text-gray-600">Add your first golf score to get started!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Your Scores</h2>
        <span className="text-sm text-gray-500">Last 5 scores</span>
      </div>

      <div className="space-y-3">
        {scores.map((score, index) => (
          <div
            key={score.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full">
                <span className="text-sm font-semibold text-primary-600">
                  {index + 1}
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">
                    {score.score}
                  </span>
                  <span className="text-sm text-gray-500">
                    {score.score <= 10 ? '🏆' : score.score <= 20 ? '⭐' : '🎯'}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(score.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDelete(score.id)}
              disabled={isLoading}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Delete score"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total scores stored</span>
          <span className="font-medium text-gray-900">{scores.length}/5</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreList;
