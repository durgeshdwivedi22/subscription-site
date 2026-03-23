import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
  loading: true,
  error: null,
};

// Mock user data for demo
const mockUsers = [
  {
    id: '1',
    name: 'Demo User',
    email: 'user@example.com',
    password: 'password123',
    role: 'user',
    is_subscribed: false,
    plan: null,
    charity: null,
    contribution_percentage: 10
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    is_subscribed: true,
    plan: 'yearly',
    charity: 'Children Education Fund',
    contribution_percentage: 15
  }
];

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set up axios default header
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [state.token]);

  // Check if token is valid on app start
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Mock validation - in real app this would validate with backend
          const userData = JSON.parse(localStorage.getItem('userData'));
          if (userData) {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                user: userData,
                token,
              },
            });
          } else {
            localStorage.removeItem('token');
            dispatch({ type: 'LOGOUT' });
          }
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock authentication
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
      
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(user));
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: { ...user },
          token,
        },
      });

      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const signup = async (name, email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Check if user already exists
      if (mockUsers.find(u => u.email === email)) {
        throw new Error('User already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        role: 'user',
        is_subscribed: false,
        plan: null,
        charity: null,
        contribution_percentage: 10
      };

      const token = btoa(JSON.stringify({ id: newUser.id, email: newUser.email }));
      
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(newUser));
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: newUser,
          token,
        },
      });

      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Signup failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData) => {
    const updatedUser = { ...state.user, ...userData };
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const value = {
    ...state,
    login,
    signup,
    logout,
    updateUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
