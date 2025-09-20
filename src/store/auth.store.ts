import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User, LoginForm, RegisterForm } from "@/types";
import { authService } from "@/services/auth.service";

interface AuthStore {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginForm) => Promise<void>;
  register: (userData: RegisterForm) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  refreshAuth: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Actions
        login: async (credentials: LoginForm) => {
          try {
            set({ isLoading: true, error: null });

            const authResponse = await authService.login(credentials);

            set({
              user: authResponse.user,
              token: authResponse.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error: any) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: error.response?.data?.message || "Login failed",
            });
            throw error;
          }
        },

        register: async (userData: RegisterForm) => {
          try {
            set({ isLoading: true, error: null });

            const authResponse = await authService.register(userData);

            set({
              user: authResponse.user,
              token: authResponse.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error: any) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: error.response?.data?.message || "Registration failed",
            });
            throw error;
          }
        },

        logout: async () => {
          try {
            await authService.logout();
          } catch (error) {
            console.error("Logout error:", error);
          } finally {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
          }
        },

        updateUser: async (userData: Partial<User>) => {
          const { user } = get();
          if (!user) {
            throw new Error("No user to update");
          }

          try {
            set({ isLoading: true, error: null });

            const updatedUser = await authService.updateProfile(user.id, userData);

            set({
              user: updatedUser,
              isLoading: false,
              error: null,
            });
          } catch (error: any) {
            set({
              isLoading: false,
              error: error.response?.data?.message || "Update failed",
            });
            throw error;
          }
        },

        refreshAuth: async () => {
          try {
            const currentUser = await authService.getCurrentUser();

            if (currentUser) {
              set({
                user: currentUser,
                isAuthenticated: true,
              });
            } else {
              // If refresh fails, logout user
              get().logout();
            }
          } catch (error) {
            console.error("Refresh auth error:", error);
            get().logout();
          }
        },

        clearError: () => {
          set({ error: null });
        },

        setLoading: (loading: boolean) => {
          set({ isLoading: loading });
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
    {
      name: "auth-store",
    },
  ),
);