import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "@/App";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Layout = () => {
  const { logout } = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header with logout */}
      {isAuthenticated && (
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  T
                </div>
                <span className="text-lg font-semibold text-gray-900">TaskFlow</span>
              </div>
              <div className="flex items-center gap-4">
                {user && (
                  <span className="text-sm text-gray-600">
                    Welcome, {user.firstName || user.emailAddress}
                  </span>
                )}
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <ApperIcon name="LogOut" className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;