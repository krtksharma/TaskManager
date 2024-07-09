import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  );
};

export default App;
