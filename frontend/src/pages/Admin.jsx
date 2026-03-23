import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/MockAuthContext';
import { Users, Trophy, Play, RefreshCw, AlertCircle } from 'lucide-react';

const Admin = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [draws, setDraws] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock data
  const mockUsers = [
    {
      id: '1',
      name: 'Demo User',
      email: 'user@example.com',
      is_subscribed: false,
      plan: null,
      charity: null,
      contribution_percentage: 10,
      role: 'user',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Admin User',
      email: 'admin@example.com',
      is_subscribed: true,
      plan: 'yearly',
      charity: 'Children Education Fund',
      contribution_percentage: 15,
      role: 'admin',
      created_at: new Date().toISOString()
    }
  ];

  const mockDraws = [
    {
      id: '1',
      numbers: [5, 12, 23, 34, 45],
      date: new Date().toISOString(),
      results: [
        {
          prize_type: 'small',
          users: { name: 'Demo User', email: 'user@example.com' }
        }
      ]
    }
  ];

  useEffect(() => {
    if (user?.role !== 'admin') {
      return;
    }
    // Load mock data
    setUsers(mockUsers);
    setDraws(mockDraws);
  }, [user]);

  const handleRunDraw = async () => {
    if (!confirm('Are you sure you want to run a new draw? This will process all subscribed users.')) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Mock draw execution
      setTimeout(() => {
        alert('Draw completed successfully! 2 users processed.');
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="text-center space-y-4">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-lg text-gray-600">You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">Manage users, draws, and system settings</p>
        </div>
        <button
          onClick={() => {
            setUsers(mockUsers);
            setDraws(mockDraws);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Subscribed Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.is_subscribed).length}
              </p>
            </div>
            <Trophy className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Draws</p>
              <p className="text-2xl font-bold text-gray-900">{draws.length}</p>
            </div>
            <Play className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Prize Winners</p>
              <p className="text-2xl font-bold text-gray-900">
                {draws.reduce((acc, draw) => 
                  acc + (draw.results?.filter(r => r.prize_type !== 'none').length || 0), 0
                )}
              </p>
            </div>
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <button
          onClick={handleRunDraw}
          disabled={isLoading}
          className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Play className="w-5 h-5" />
          <span>{isLoading ? 'Running Draw...' : 'Run New Draw'}</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Charity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.is_subscribed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.is_subscribed ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.plan ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1) : 'None'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.charity || 'Not selected'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Draws */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Draws</h2>
        <div className="space-y-4">
          {draws.map((draw) => (
            <div key={draw.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Draw #{draw.id.slice(0, 8)}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(draw.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  [{draw.numbers?.join(', ')}]
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {draw.results?.length || 0} participants •{' '}
                {draw.results?.filter(r => r.prize_type !== 'none').length || 0} winners
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
