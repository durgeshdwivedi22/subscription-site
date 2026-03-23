import React from 'react';
import { Trophy, Medal, Award, Calendar } from 'lucide-react';

const DrawResults = ({ results }) => {
  const getPrizeIcon = (prizeType) => {
    switch (prizeType) {
      case 'jackpot':
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'medium':
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 'small':
        return <Award className="w-5 h-5 text-orange-600" />;
      default:
        return <Trophy className="w-5 h-5 text-gray-300" />;
    }
  };

  const getPrizeColor = (prizeType) => {
    switch (prizeType) {
      case 'jackpot':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'medium':
        return 'bg-gray-50 border-gray-200 text-gray-800';
      case 'small':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600';
    }
  };

  const getPrizeText = (prizeType) => {
    switch (prizeType) {
      case 'jackpot':
        return 'Jackpot! 🎉';
      case 'medium':
        return 'Medium Prize';
      case 'small':
        return 'Small Prize';
      default:
        return 'No Prize';
    }
  };

  if (!results || results.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Draws</h2>
          <Trophy className="w-5 h-5 text-gray-400" />
        </div>

        <div className="text-center space-y-4">
          <Trophy className="w-12 h-12 text-gray-400 mx-auto" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">No draws yet</h3>
            <p className="text-gray-600">Draw results will appear here when available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Recent Draws</h2>
        <Trophy className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-3">
        {results.map((result) => (
          <div
            key={result.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  {getPrizeIcon(result.prize_type)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPrizeColor(result.prize_type)}`}>
                    {getPrizeText(result.prize_type)}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Matches:</span> {result.match_count}/5
                  </div>

                  {result.draws && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Draw Numbers:</span>{' '}
                      <span className="font-mono">
                        [{result.draws.numbers?.join(', ')}]
                      </span>
                    </div>
                  )}

                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(result.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>Prize Tiers:</strong></p>
          <p>• 5 matches = Jackpot</p>
          <p>• 4 matches = Medium Prize</p>
          <p>• 3 matches = Small Prize</p>
        </div>
      </div>
    </div>
  );
};

export default DrawResults;
