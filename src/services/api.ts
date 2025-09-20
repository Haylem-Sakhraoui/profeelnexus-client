import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { storage } from "@/utils";

// Create axios instance with base configuration
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor to add auth token
  instance.interceptors.request.use(
    (config) => {
      const token = storage.get<string>("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response interceptor for error handling
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      // Handle common errors
      if (error.response?.status === 401) {
        // Unauthorized - clear token and redirect to login
        storage.remove("auth_token");
        storage.remove("user");
        window.location.href = "/login";
      }

      if (error.response?.status === 403) {
        // Forbidden - show error message
        console.error("Access forbidden");
      }

      if (error.response?.status >= 500) {
        // Server error
        console.error("Server error occurred");
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

// Create the main API instance
export const api = createApiInstance();

// Generic API methods
export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    api.get<T>(url, config),

  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => api.post<T>(url, data, config),

  put: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => api.put<T>(url, data, config),

  patch: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => api.patch<T>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    api.delete<T>(url, config),
};

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",
  },

  // Users
  USERS: {
    BASE: "/users",
    PROFILE: (id: string) => `/users/${id}`,
    UPDATE_PROFILE: (id: string) => `/users/${id}`,
  },

  // Courses
  COURSES: {
    BASE: "/courses",
    DETAIL: (id: string) => `/courses/${id}`,
    LESSONS: (id: string) => `/courses/${id}/lessons`,
    ENROLL: (id: string) => `/courses/${id}/enroll`,
    REVIEWS: (id: string) => `/courses/${id}/reviews`,
  },

  // Enrollments
  ENROLLMENTS: {
    BASE: "/enrollments",
    USER_ENROLLMENTS: (userId: string) => `/enrollments/user/${userId}`,
    PROGRESS: (enrollmentId: string) => `/enrollments/${enrollmentId}/progress`,
  },

  // Categories
  CATEGORIES: {
    BASE: "/categories",
  },

  // Search
  SEARCH: {
    COURSES: "/search/courses",
    INSTRUCTORS: "/search/instructors",
  },
} as const;