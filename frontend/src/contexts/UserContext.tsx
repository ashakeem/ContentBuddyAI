import { createContext, useContext, useState, useEffect } from 'react';   
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  username: string;
}

interface UserContextType {
  user: User | null;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user details
      fetchUserDetails();
    }
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      logout();
    }
  };

  const login = async (token: string, refreshToken: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    await fetchUserDetails();
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
    navigate('/login');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 