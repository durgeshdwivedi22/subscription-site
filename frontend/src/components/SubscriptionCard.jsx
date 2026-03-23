import React, { useState } from 'react';
import { CheckCircle, X, CreditCard } from 'lucide-react';

const SubscriptionCard = ({ currentPlan, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const plans = [
    {
      name: 'monthly',
      displayName: 'Monthly',
      price: '$9.99',
      period: '/month',
      features: [
        'Add up to 5 golf scores',
        'Participate in monthly draws',
        'Support your favorite charity',
        'Access to dashboard'
      ]
    },
    {
      name: 'yearly',
      displayName: 'Yearly',
      price: '$99.99',
      period: '/year',
      features: [
        'Add up to 5 golf scores',
        'Participate in all draws',
        'Support your favorite charity',
        'Access to dashboard',
        'Save 17% vs monthly'
      ],
      popular: true
    }
  ];

  const handleSubscribe = async (plan) => {
    setIsLoading(true);
    setError('');

    try {
      // Mock subscription - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResponse = {
        is_subscribed: true,
        plan: plan,
        expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      };

      onUpdate(mockResponse);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Mock cancellation - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResponse = {
        is_subscribed: false,
        plan: null,
        expiry_date: null
      };

      onUpdate(mockResponse);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (currentPlan) {
    const plan = plans.find(p => p.name === currentPlan);
    
    return (
      <div className="glass-card p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Subscription Status</h2>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Active</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl p-6 text-white">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold">{plan.price}</div>
            <div className="text-lg opacity-90">{plan.displayName}</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Your Benefits</h3>
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleCancel}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Cancelling...</span>
            </>
          ) : (
            <>
              <X className="w-4 h-4" />
              <span>Cancel Subscription</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Choose Your Plan</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select a subscription to access all features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`glass-card p-8 space-y-6 transform transition-all duration-300 hover:scale-105 ${
              plan.popular ? 'ring-2 ring-primary-500/30' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {plan.popular && (
              <div className="flex justify-center">
                <span className="gradient-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse-slow">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {plan.displayName}
              </h3>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-gradient">{plan.price}</div>
                <div className="text-gray-600 dark:text-gray-400">{plan.period}</div>
              </div>
            </div>

            <ul className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.name)}
              disabled={isLoading}
              className={`w-full flex items-center justify-center space-x-2 px-6 py-3 font-bold rounded-xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                plan.popular
                  ? 'btn-primary text-white'
                  : 'btn-secondary'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Subscribe Now</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;
