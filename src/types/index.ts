// User and Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
  ADMIN = "ADMIN",
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  price: number;
  discountPrice?: number;
  duration: number; // in minutes
  level: CourseLevel;
  category: string;
  tags: string[];
  instructor: Instructor;
  rating: number;
  reviewCount: number;
  studentCount: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  avatar?: string;
  expertise: string[];
  rating: number;
  courseCount: number;
}

// Lesson and Content Types
export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration: number;
  order: number;
  isPreview: boolean;
  resources: LessonResource[];
}

export interface LessonResource {
  id: string;
  title: string;
  type: ResourceType;
  url: string;
  size?: number;
}

export enum ResourceType {
  PDF = "PDF",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  DOCUMENT = "DOCUMENT",
  LINK = "LINK",
}

// Enrollment and Progress Types
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progress: number; // 0-100
  completedLessons: string[];
  lastAccessedAt: string;
}

export interface LessonProgress {
  lessonId: string;
  isCompleted: boolean;
  watchTime: number;
  completedAt?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CourseFilters {
  category?: string;
  level?: CourseLevel;
  priceRange?: [number, number];
  rating?: number;
  search?: string;
}

// UI Component Types
export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}