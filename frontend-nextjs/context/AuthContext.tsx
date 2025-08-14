'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any; // Replace 'any' with your user type
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  metamaskLogin: (walletAddress: string) => Promise<any>;
  register: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'email-login', email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "An unexpected error occurred during login." };
    } finally {
      setLoading(false);
    }
  };

  const metamaskLogin = async (walletAddress: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'metamask-login', walletAddress }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || "MetaMask login failed" };
      }
    } catch (error) {
      console.error("MetaMask login error:", error);
      return { success: false, message: "An unexpected error occurred during MetaMask login." };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'register', email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || "Registration failed" };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "An unexpected error occurred during registration." };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        setUser(null);
        router.push('/login');
      } else {
        console.error("Logout failed on server.");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, metamaskLogin, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
