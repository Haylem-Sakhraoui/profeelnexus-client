"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, AuthState, LoginForm, RegisterForm } from "@/types";
import { authService } from "@/services/auth.service";

interface AuthContextType extends AuthState {
  login: (credentials: LoginForm) => Promise<void>;
  register: (userData: RegisterForm) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = authService.getStoredToken();
        const storedUser = authService.getStoredUser();

        if (storedToken && storedUser) {
          // Verify token is still valid by fetching current user
          const currentUser = await authService.getCurrentUser();
          
          if (currentUser) {
            setAuthState({
              user: currentUser,
              token: storedToken,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            // Token is invalid, clear auth data
            authService.clearAuthData();
            setAuthState({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        } else {
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        authService.clearAuthData();
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginForm): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      
      const authResponse = await authService.login(credentials);
      
      setAuthState({
        user: authResponse.user,
        token: authResponse.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (userData: RegisterForm): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      
      const authResponse = await authService.register(userData);
      
      setAuthState({
        user: authResponse.user,
        token: authResponse.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const updateUser = async (userData: Partial<User>): Promise<void> => {
    if (!authState.user) {
      throw new Error("No user to update");
    }

    try {
      const updatedUser = await authService.updateProfile(authState.user.id, userData);
      
      setAuthState((prev) => ({
        ...prev,
        user: updatedUser,
      }));
    } catch (error) {
      console.error("Update user error:", error);
      throw error;
    }
  };

  const refreshAuth = async (): Promise<void> => {
    try {
      const currentUser = await authService.getCurrentUser();
      
      if (currentUser) {
        setAuthState((prev) => ({
          ...prev,
          user: currentUser,
        }));
      }
    } catch (error) {
      console.error("Refresh auth error:", error);
      // If refresh fails, logout user
      await logout();
    }
  };

  const contextValue: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    updateUser,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}