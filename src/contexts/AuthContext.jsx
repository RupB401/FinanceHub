import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Demo accounts for client-side authentication
const DEMO_ACCOUNTS = [
  { id: '1', email: 'admin@demo.com', password: 'admin123', name: 'Admin User' },
  { id: '2', email: 'user@demo.com', password: 'user123', name: 'Demo User' },
  { id: '3', email: 'test@demo.com', password: 'test123', name: 'Test User' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem("user_data");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Client-side login with demo accounts
  const login = (email, password, rememberMe = false) => {
    try {
      // Validate against demo accounts
      const account = DEMO_ACCOUNTS.find(
        (acc) => acc.email === email && acc.password === password
      );

      if (!account) {
        return { success: false, error: "Invalid email or password" };
      }

      // Create user object
      const userData = {
        id: account.id,
        email: account.email,
        name: account.name,
        profileImage: null,
        currency: "USD",
        language: "en",
        theme: "light",
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      localStorage.setItem("user_data", JSON.stringify(userData));
      if (rememberMe) {
        localStorage.setItem("remember_me", "true");
      }

      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Login failed" };
    }
  };

  // Client-side signup with demo accounts
  const signup = (email, password, name, rememberMe = false) => {
    try {
      // Check if email already exists
      const exists = DEMO_ACCOUNTS.some((acc) => acc.email === email);
      if (exists) {
        return { success: false, error: "Email already registered" };
      }

      // For demo purposes, limit signups
      if (DEMO_ACCOUNTS.length >= 5) {
        return { success: false, error: "Demo signup limit reached. Use existing accounts." };
      }

      // Create new demo account
      const newAccount = {
        id: String(DEMO_ACCOUNTS.length + 1),
        email,
        password,
        name,
      };
      DEMO_ACCOUNTS.push(newAccount);

      // Create user object
      const userData = {
        id: newAccount.id,
        email: newAccount.email,
        name: newAccount.name,
        profileImage: null,
        currency: "USD",
        language: "en",
        theme: "light",
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      localStorage.setItem("user_data", JSON.stringify(userData));
      if (rememberMe) {
        localStorage.setItem("remember_me", "true");
      }

      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, error: "Signup failed" };
    }
  };

  // Logout
  const logout = () => {
    try {
      localStorage.removeItem("user_data");
      localStorage.removeItem("remember_me");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Client-side forgot password
  const forgotPassword = (email) => {
    try {
      const account = DEMO_ACCOUNTS.find((acc) => acc.email === email);
      if (!account) {
        return { success: false, error: "Email not found" };
      }
      // Demo: just acknowledge the request
      return { success: true, message: "Password reset link sent to email (demo)" };
    } catch (error) {
      console.error("Forgot password error:", error);
      return { success: false, error: "Error processing request" };
    }
  };

  // Client-side reset password
  const resetPassword = (email, otp, newPassword) => {
    try {
      const account = DEMO_ACCOUNTS.find((acc) => acc.email === email);
      if (!account) {
        return { success: false, error: "Email not found" };
      }
      // Demo: update password in demo accounts
      account.password = newPassword;
      return { success: true, message: "Password reset successfully" };
    } catch (error) {
      console.error("Reset password error:", error);
      return { success: false, error: "Error resetting password" };
    }
  };

  // Refresh user (read from localStorage)
  const refreshUser = () => {
    try {
      const savedUser = localStorage.getItem("user_data");
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error("Refresh user error:", error);
      return { success: false };
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    refreshUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
