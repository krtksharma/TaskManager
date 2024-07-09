// frontend/src/contexts/AuthContext.jsx
import { createContext, useContext } from 'react';
import { useAuth } from '@clerk/clerk-react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, isLoaded } = useAuth();  // Fetch `user` and `isLoaded` state from `useAuth`
  return (
    <AuthContext.Provider value={{ user, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
