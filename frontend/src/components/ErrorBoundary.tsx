import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B1C2C] text-white flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-orange-400">Oops!</h1>
            <p className="text-lg text-gray-300">Something went wrong.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition-colors"
            >
              Kindly refresh the page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;