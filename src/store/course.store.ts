import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Course, CourseFilters, Enrollment } from "@/types";
import { courseService } from "@/services/course.service";

interface CourseStore {
  // State
  courses: Course[];
  featuredCourses: Course[];
  popularCourses: Course[];
  currentCourse: Course | null;
  enrollments: Enrollment[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  // Actions
  getCourses: (page?: number, limit?: number, filters?: CourseFilters) => Promise<void>;
  getCourseById: (id: string) => Promise<void>;
  getFeaturedCourses: (limit?: number) => Promise<void>;
  getPopularCourses: (limit?: number) => Promise<void>;
  searchCourses: (query: string, filters?: CourseFilters) => Promise<void>;
  enrollInCourse: (courseId: string) => Promise<void>;
  getCategories: () => Promise<void>;
  clearCurrentCourse: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useCourseStore = create<CourseStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      courses: [],
      featuredCourses: [],
      popularCourses: [],
      currentCourse: null,
      enrollments: [],
      categories: [],
      isLoading: false,
      error: null,
      pagination: {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
      },

      // Actions
      getCourses: async (page = 1, limit = 12, filters?: CourseFilters) => {
        try {
          set({ isLoading: true, error: null });

          const response = await courseService.getCourses(page, limit, filters);

          set({
            courses: response.data,
            pagination: response.pagination,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Failed to fetch courses",
          });
        }
      },

      getCourseById: async (id: string) => {
        try {
          set({ isLoading: true, error: null });

          const course = await courseService.getCourseById(id);

          set({
            currentCourse: course,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Failed to fetch course",
          });
        }
      },

      getFeaturedCourses: async (limit = 6) => {
        try {
          const courses = await courseService.getFeaturedCourses(limit);

          set({
            featuredCourses: courses,
          });
        } catch (error: any) {
          console.error("Failed to fetch featured courses:", error);
        }
      },

      getPopularCourses: async (limit = 6) => {
        try {
          const courses = await courseService.getPopularCourses(limit);

          set({
            popularCourses: courses,
          });
        } catch (error: any) {
          console.error("Failed to fetch popular courses:", error);
        }
      },

      searchCourses: async (query: string, filters?: CourseFilters) => {
        try {
          set({ isLoading: true, error: null });

          const courses = await courseService.searchCourses(query, filters);

          set({
            courses,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Search failed",
          });
        }
      },

      enrollInCourse: async (courseId: string) => {
        try {
          set({ isLoading: true, error: null });

          const enrollment = await courseService.enrollInCourse(courseId);

          set((state) => ({
            enrollments: [...state.enrollments, enrollment],
            isLoading: false,
            error: null,
          }));
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Enrollment failed",
          });
          throw error;
        }
      },

      getCategories: async () => {
        try {
          const categories = await courseService.getCategories();

          set({
            categories,
          });
        } catch (error: any) {
          console.error("Failed to fetch categories:", error);
        }
      },

      clearCurrentCourse: () => {
        set({ currentCourse: null });
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "course-store",
    },
  ),
);