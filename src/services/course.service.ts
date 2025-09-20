import { apiClient, API_ENDPOINTS } from "./api";
import {
  Course,
  Lesson,
  Enrollment,
  CourseFilters,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

class CourseService {
  async getCourses(
    page = 1,
    limit = 12,
    filters?: CourseFilters,
  ): Promise<PaginatedResponse<Course>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      // Add filters to params
      if (filters) {
        if (filters.category) params.append("category", filters.category);
        if (filters.level) params.append("level", filters.level);
        if (filters.search) params.append("search", filters.search);
        if (filters.rating) params.append("rating", filters.rating.toString());
        if (filters.priceRange) {
          params.append("minPrice", filters.priceRange[0].toString());
          params.append("maxPrice", filters.priceRange[1].toString());
        }
      }

      const response = await apiClient.get<PaginatedResponse<Course>>(
        `${API_ENDPOINTS.COURSES.BASE}?${params.toString()}`,
      );

      return response.data;
    } catch (error) {
      console.error("Get courses error:", error);
      throw error;
    }
  }

  async getCourseById(id: string): Promise<Course> {
    try {
      const response = await apiClient.get<ApiResponse<Course>>(
        API_ENDPOINTS.COURSES.DETAIL(id),
      );

      return response.data.data;
    } catch (error) {
      console.error("Get course by ID error:", error);
      throw error;
    }
  }

  async getCourseLessons(courseId: string): Promise<Lesson[]> {
    try {
      const response = await apiClient.get<ApiResponse<Lesson[]>>(
        API_ENDPOINTS.COURSES.LESSONS(courseId),
      );

      return response.data.data;
    } catch (error) {
      console.error("Get course lessons error:", error);
      throw error;
    }
  }

  async enrollInCourse(courseId: string): Promise<Enrollment> {
    try {
      const response = await apiClient.post<ApiResponse<Enrollment>>(
        API_ENDPOINTS.COURSES.ENROLL(courseId),
      );

      return response.data.data;
    } catch (error) {
      console.error("Enroll in course error:", error);
      throw error;
    }
  }

  async getCourseReviews(
    courseId: string,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<any>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await apiClient.get<PaginatedResponse<any>>(
        `${API_ENDPOINTS.COURSES.REVIEWS(courseId)}?${params.toString()}`,
      );

      return response.data;
    } catch (error) {
      console.error("Get course reviews error:", error);
      throw error;
    }
  }

  async searchCourses(query: string, filters?: CourseFilters): Promise<Course[]> {
    try {
      const params = new URLSearchParams({
        q: query,
      });

      // Add filters to params
      if (filters) {
        if (filters.category) params.append("category", filters.category);
        if (filters.level) params.append("level", filters.level);
        if (filters.rating) params.append("rating", filters.rating.toString());
        if (filters.priceRange) {
          params.append("minPrice", filters.priceRange[0].toString());
          params.append("maxPrice", filters.priceRange[1].toString());
        }
      }

      const response = await apiClient.get<ApiResponse<Course[]>>(
        `${API_ENDPOINTS.SEARCH.COURSES}?${params.toString()}`,
      );

      return response.data.data;
    } catch (error) {
      console.error("Search courses error:", error);
      throw error;
    }
  }

  async getFeaturedCourses(limit = 6): Promise<Course[]> {
    try {
      const response = await apiClient.get<ApiResponse<Course[]>>(
        `${API_ENDPOINTS.COURSES.BASE}/featured?limit=${limit}`,
      );

      return response.data.data;
    } catch (error) {
      console.error("Get featured courses error:", error);
      throw error;
    }
  }

  async getPopularCourses(limit = 6): Promise<Course[]> {
    try {
      const response = await apiClient.get<ApiResponse<Course[]>>(
        `${API_ENDPOINTS.COURSES.BASE}/popular?limit=${limit}`,
      );

      return response.data.data;
    } catch (error) {
      console.error("Get popular courses error:", error);
      throw error;
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const response = await apiClient.get<ApiResponse<string[]>>(
        API_ENDPOINTS.CATEGORIES.BASE,
      );

      return response.data.data;
    } catch (error) {
      console.error("Get categories error:", error);
      throw error;
    }
  }
}

export const courseService = new CourseService();