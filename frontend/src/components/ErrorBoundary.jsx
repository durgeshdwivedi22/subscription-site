import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="glass-card p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              
              <div className="space-y-3">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Oops! Something went wrong
                </h1>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We're sorry, but something unexpected happened. The error has been logged and we'll look into it.
                </p>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-left">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Error Details:</h3>
                  <pre className="text-sm text-red-700 dark:text-red-300 overflow-auto max-h-40">
                    {this.state.error.toString()}
                  </pre>
                </div>
              )}

              <button
                onClick={this.handleReset}
                className="btn-primary w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </button>

              <div className="text-sm text-gray-500 dark:text-gray-500">
                If this problem persists, please refresh the page or contact support.
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
