import React from "react";

interface LoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "light";
  fullScreen?: boolean;
}

export default function Loader({
  text = "Loading...",
  size = "md",
  variant = "primary",
  fullScreen = false,
}: LoaderProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const variantClasses = {
    primary: "border-blue-500",
    secondary: "border-gray-400",
    light: "border-blue-500",
  };

  const textColorClasses = {
    primary: "text-gray-700",
    secondary: "text-gray-600",
    light: "text-gray-700",
  };

  const containerClasses = fullScreen
    ? "min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center"
    : "flex items-center justify-center py-12";

  return (
    <div className={containerClasses}>
      <div className="text-center">
        {/* Simple Spinner */}
        <div className="relative mb-6">
          <div className={`${sizeClasses[size]} mx-auto`}>
            <div
              className={`w-full h-full rounded-full border-3 border-gray-200 ${variantClasses[variant]} border-t-transparent animate-spin`}
            ></div>
          </div>
        </div>

        {/* Loading Text */}
        <p className={`text-base font-medium ${textColorClasses[variant]}`}>
          {text}
        </p>

        {/* Optional subtitle for full screen */}
        {fullScreen && (
          <p className={`mt-2 text-sm text-gray-500`}>
            Please wait a moment...
          </p>
        )}
      </div>
    </div>
  );
}
