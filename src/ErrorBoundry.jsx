import React from "react";

class ErrorBoundry extends React.Component {
  state = { error: false };

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  render() {
    const { error } = this.state;

    if (error === false) {
      return this.props.children;
    }

    return <div>ErrorBoundry Page</div>;
  }
}

export default ErrorBoundry;
