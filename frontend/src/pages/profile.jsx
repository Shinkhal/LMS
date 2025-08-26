import { useEffect, useState } from "react";
import api from "../api/axios";
import { User, Mail, Calendar, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Profile() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load profile", err);
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ---------------- Skeleton Loader ----------------
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl animate-pulse grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- Error State ----------------
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-7 h-7 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.662 1.732-3L13.732 4c-.77-1.338-2.694-1.338-3.464 0L3.34 16c-.77 1.338.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Unable to load profile
          </h3>
          <p className="text-gray-500 text-sm mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // ---------------- Helpers ----------------
  const getInitials = () =>
    `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase();

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });


    const handleEditProfile = () => {
      navigate("/edit-profile");
    };


  // ---------------- Main Profile ----------------
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border grid grid-cols-1 md:grid-cols-3">
        {/* Left Panel */}
        <div className="p-8 border-b md:border-b-0 md:border-r flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">{getInitials()}</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-gray-500 text-sm">{user.email}</p>

          <button onClick={handleEditProfile} className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition w-full">
            Edit Profile
          </button>
        </div>

        {/* Right Panel */}
        <div className="p-8 md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Profile Information
          </h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-gray-900 font-medium">
                  {user.first_name} {user.last_name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-gray-900 font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-gray-900 font-medium">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <RefreshCcw className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-gray-900 font-medium">
                  {formatDate(user.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
