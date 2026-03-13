import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const profile = await api.get('/user/profile/');
          setUser(profile);
        } catch (error) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/user/login/', { email, password });
      localStorage.setItem('access_token', response.token.access);
      localStorage.setItem('refresh_token', response.token.refresh);
      
      // Fetch profile after login
      const profile = await api.get('/user/profile/');
      setUser(profile);
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/user/register/', userData);
      localStorage.setItem('access_token', response.token.access);
      localStorage.setItem('refresh_token', response.token.refresh);
      
      const profile = await api.get('/user/profile/');
      setUser(profile);
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
