import { useCourseStore } from "@/store/course.store";
import { CourseFilters } from "@/types";

export const useCourses = () => {
  const {
    courses,
    featuredCourses,
    popularCourses,
    currentCourse,
    enrollments,
    categories,
    isLoading,
    error,
    pagination,
    fetchCourses,
    fetchCourseById,
    fetchFeaturedCourses,
    fetchPopularCourses,
    searchCourses,
    enrollInCourse,
    fetchCategories,
    clearCurrentCourse,
    clearError,
    setLoading,
  } = useCourseStore();

  const loadCourses = (filters?: CourseFilters) => {
    return fetchCourses(filters);
  };

  const loadCourseDetails = (id: string) => {
    return fetchCourseById(id);
  };

  const searchForCourses = (query: string, filters?: CourseFilters) => {
    return searchCourses(query, filters);
  };

  const enrollStudent = (courseId: string) => {
    return enrollInCourse(courseId);
  };

  return {
    // State
    courses,
    featuredCourses,
    popularCourses,
    currentCourse,
    enrollments,
    categories,
    isLoading,
    error,
    pagination,
    
    // Actions
    loadCourses,
    loadCourseDetails,
    fetchFeaturedCourses,
    fetchPopularCourses,
    searchForCourses,
    enrollStudent,
    fetchCategories,
    clearCurrentCourse,
    clearError,
    setLoading,
    
    // Computed values
    hasCourses: courses.length > 0,
    hasMorePages: pagination.page < pagination.totalPages,
    isEnrolledInCourse: (courseId: string) => 
      enrollments.some(enrollment => enrollment.courseId === courseId),
  };
};