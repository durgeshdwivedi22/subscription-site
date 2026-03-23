import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/MockAuthContext';
import { Trophy, Users, Heart, Star, ArrowRight, CheckCircle, Sparkles, Zap, Shield } from 'lucide-react';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: Trophy,
      title: 'Score Management',
      description: 'Track your golf scores and compete in charity draws',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join a community of golf enthusiasts supporting good causes',
      color: 'from-accent-500 to-accent-600'
    },
    {
      icon: Heart,
      title: 'Charity Support',
      description: 'Support your favorite charities while enjoying the game',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Star,
      title: 'Win Prizes',
      description: 'Participate in draws and win exciting prizes',
      color: 'from-yellow-500 to-orange-600'
    },
  ];

  const plans = [
    {
      name: 'Monthly',
      price: '$9.99',
      period: '/month',
      features: [
        'Add up to 5 golf scores',
        'Participate in monthly draws',
        'Support your favorite charity',
        'Access to dashboard',
      ],
      popular: false,
      gradient: 'from-gray-600 to-gray-700'
    },
    {
      name: 'Yearly',
      price: '$99.99',
      period: '/year',
      features: [
        'Add up to 5 golf scores',
        'Participate in all draws',
        'Support your favorite charity',
        'Access to dashboard',
        'Save 17% vs monthly',
      ],
      popular: true,
      gradient: 'gradient-primary'
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-8 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary-400/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute top-20 right-10 w-40 h-40 bg-accent-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative space-y-6 animate-fade-in">
          <div className="flex justify-center space-x-4">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center animate-bounce-gentle">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <Sparkles className="w-8 h-8 text-primary-500 animate-pulse-slow" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-gradient">Golf Charity</span>
              <br />
              <span className="text-gray-600 dark:text-gray-300">Platform</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Transform your golf scores into charitable contributions. Join our community 
              of golf enthusiasts making a difference one swing at a time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="group inline-flex items-center justify-center px-8 py-4 btn-primary text-lg"
              >
                Go to Dashboard
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="group inline-flex items-center justify-center px-8 py-4 btn-primary text-lg"
                >
                  Get Started
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-4 btn-secondary text-lg"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Why Join Us?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the perfect blend of golf, charity, and community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group">
                <div className="glass-card p-8 text-center space-y-6 card-hover h-full">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="glass-card p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">1000+</h3>
            <p className="text-gray-600 dark:text-gray-400">Active Members</p>
          </div>
          <div className="space-y-3">
            <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">$50K+</h3>
            <p className="text-gray-600 dark:text-gray-400">Raised for Charity</p>
          </div>
          <div className="space-y-3">
            <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">500+</h3>
            <p className="text-gray-600 dark:text-gray-400">Prizes Won</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Choose Your Plan</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Select the subscription that works best for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group animate-slide-up ${plan.popular ? 'scale-105' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="gradient-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse-slow">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`glass-card p-8 h-full ${
                plan.popular ? 'border-2 border-primary-500/30' : ''
              }`}>
                <div className="text-center space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className="text-5xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                      <span className="text-xl text-gray-600 dark:text-gray-400">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 text-left">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isAuthenticated ? (
                    <Link
                      to="/dashboard"
                      className={`block w-full py-4 px-6 rounded-xl font-bold text-lg transform transition-all duration-200 hover:scale-105 ${
                        plan.popular
                          ? 'btn-primary'
                          : 'btn-secondary'
                      }`}
                    >
                      {user?.is_subscribed ? 'Manage Plan' : 'Subscribe Now'}
                    </Link>
                  ) : (
                    <Link
                      to="/signup"
                      className={`block w-full py-4 px-6 rounded-xl font-bold text-lg transform transition-all duration-200 hover:scale-105 ${
                        plan.popular
                          ? 'btn-primary'
                          : 'btn-secondary'
                      }`}
                    >
                      Get Started
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-90"></div>
        <div className="relative glass-card p-16 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of golfers who are turning their passion into positive change
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to={isAuthenticated ? "/dashboard" : "/signup"}
              className="group inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 text-lg"
            >
              {isAuthenticated ? "Go to Dashboard" : "Start Your Journey"}
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex items-center space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Charitable</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
