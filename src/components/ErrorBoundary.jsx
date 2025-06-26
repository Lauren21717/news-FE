import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-16 bg-gray-50">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Something Went Wrong
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-md">
            We've encountered an unexpected error. Please try refreshing the
            page.
          </p>
          <div className="mt-8">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
