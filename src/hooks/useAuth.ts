import { useAuthStore } from "@/store/auth.store";

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateUser,
    refreshAuth,
    clearError,
    setLoading,
  } = useAuthStore();

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    
    // Actions
    login,
    register,
    logout,
    updateUser,
    refreshAuth,
    clearError,
    setLoading,
    
    // Computed values
    isLoggedIn: isAuthenticated && !!user,
    userRole: user?.role,
    userName: user ? `${user.firstName} ${user.lastName}` : null,
  };
};