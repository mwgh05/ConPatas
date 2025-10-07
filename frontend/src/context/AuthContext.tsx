import React, { useState, createContext, useContext } from 'react';
import { Dog } from '../data/dogs';
interface User {
  id: string;
  name: string;
  email: string;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  publishedDogs: Dog[];
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  publishDog: (dog: Dog) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  // Toggle this to `true` during development if you want to see a mock
  // user without going through the login/register flow. Set to `false`
  // before shipping or when testing auth flows.
  const ENABLE_MOCK_USER = true; // <-- change to false to disable

  const MOCK_USER: User = {
    id: '1',
    name: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com'
  };

  const [user, setUser] = useState<User | null>(ENABLE_MOCK_USER ? MOCK_USER : null);
  const [publishedDogs, setPublishedDogs] = useState<Dog[]>([]);
  const login = (email: string, password: string) => {
    // Simulate authentication
    setUser({
      id: '1',
      name: 'Usuario Ejemplo',
      email: email
    });
  };
  const register = (name: string, email: string, password: string) => {
    // Simulate registration
    setUser({
      id: '1',
      name: name,
      email: email
    });
  };
  const logout = () => {
    setUser(null);
  };
  const publishDog = (dog: Dog) => {
    setPublishedDogs(prevDogs => [...prevDogs, dog]);
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: !!user,
    publishedDogs,
    login,
    register,
    logout,
    publishDog
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};