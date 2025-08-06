import React from "react";

const Loading = ({ variant = "default" }) => {
  if (variant === "skeleton") {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-surface rounded-xl p-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="flex space-x-2">
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading tasks...</h3>
        <p className="text-gray-600">Getting your productivity tools ready</p>
      </div>
    </div>
  );
};

export default Loading;