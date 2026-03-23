import React, { useState } from 'react';
import { Heart, Save } from 'lucide-react';

const CharitySelector = ({ charities, selectedCharity, contributionPercentage, onUpdate }) => {
  const [formData, setFormData] = useState({
    charity: selectedCharity || '',
    contribution_percentage: contributionPercentage || 10
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update charity selection');
      }

      onUpdate(data.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Charity Support</h2>
        <Heart className="w-5 h-5 text-red-500" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="charity" className="block text-sm font-medium text-gray-700 mb-1">
            Select Charity
          </label>
          <select
            id="charity"
            name="charity"
            value={formData.charity}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Choose a charity...</option>
            {charities.map((charity) => (
              <option key={charity.id} value={charity.name}>
                {charity.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contribution_percentage" className="block text-sm font-medium text-gray-700 mb-1">
            Contribution Percentage: {formData.contribution_percentage}%
          </label>
          <input
            type="range"
            id="contribution_percentage"
            name="contribution_percentage"
            min="0"
            max="100"
            step="5"
            value={formData.contribution_percentage}
            onChange={handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Saving...' : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Selection
            </>
          )}
        </button>
      </form>

      {selectedCharity && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Current:</strong> {selectedCharity} ({contributionPercentage}% contribution)
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>Select a charity to support with your winnings. You can choose what percentage of your winnings to contribute.</p>
      </div>
    </div>
  );
};

export default CharitySelector;
