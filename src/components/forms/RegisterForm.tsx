import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/auth.store";
import { Button, Input } from "@/components/ui";
import { validateEmail } from "@/utils";
import { RegisterFormData } from "@/types";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { register, isLoading, error } = useAuthStore();
  
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await register(formData);
      router.push("/dashboard");
    } catch (err) {
      // Error is handled by the store
      console.error("Registration failed:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof RegisterFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          placeholder="Enter your first name"
          required
        />
        
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          placeholder="Enter your last name"
          required
        />
      </div>
      
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter your email"
        required
      />
      
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Create a password"
        required
      />
      
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="Confirm your password"
        required
      />
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isLoading}
        className="w-full"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;