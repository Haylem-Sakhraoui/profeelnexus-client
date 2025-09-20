import { apiClient, API_ENDPOINTS } from "./api";
import { User, LoginForm, RegisterForm, ApiResponse } from "@/types";
import { storage } from "@/utils";

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

class AuthService {
  async login(credentials: LoginForm): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials,
      );

      const { user, token, refreshToken } = response.data.data;

      // Store auth data
      storage.set("auth_token", token);
      storage.set("refresh_token", refreshToken);
      storage.set("user", user);

      return response.data.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async register(userData: RegisterForm): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.AUTH.REGISTER,
        userData,
      );

      const { user, token, refreshToken } = response.data.data;

      // Store auth data
      storage.set("auth_token", token);
      storage.set("refresh_token", refreshToken);
      storage.set("user", user);

      return response.data.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      const token = storage.get<string>("refresh_token");
      if (token) {
        await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken: token });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage regardless of API call success
      this.clearAuthData();
    }
  }

  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = storage.get<string>("refresh_token");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await apiClient.post<ApiResponse<{ token: string }>>(
        API_ENDPOINTS.AUTH.REFRESH,
        { refreshToken },
      );

      const newToken = response.data.data.token;
      storage.set("auth_token", newToken);

      return newToken;
    } catch (error) {
      console.error("Token refresh error:", error);
      this.clearAuthData();
      return null;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiClient.get<ApiResponse<User>>(
        API_ENDPOINTS.AUTH.PROFILE,
      );

      const user = response.data.data;
      storage.set("user", user);

      return user;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  }

  async updateProfile(userId: string, userData: Partial<User>): Promise<User> {
    try {
      const response = await apiClient.put<ApiResponse<User>>(
        API_ENDPOINTS.USERS.UPDATE_PROFILE(userId),
        userData,
      );

      const updatedUser = response.data.data;
      storage.set("user", updatedUser);

      return updatedUser;
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  }

  getStoredUser(): User | null {
    return storage.get<User>("user");
  }

  getStoredToken(): string | null {
    return storage.get<string>("auth_token");
  }

  isAuthenticated(): boolean {
    const token = this.getStoredToken();
    const user = this.getStoredUser();
    return !!(token && user);
  }

  clearAuthData(): void {
    storage.remove("auth_token");
    storage.remove("refresh_token");
    storage.remove("user");
  }
}

export const authService = new AuthService();