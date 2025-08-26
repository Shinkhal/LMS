import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   
  const [loading, setLoading] = useState(true);

  // Call backend with cookies included
  axios.defaults.withCredentials = true;

  // Fetch current user
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("auth/me");
      setUser(data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      await axios.post("auth/login", { email, password });
      await fetchUser();
      toast.success("Login successful");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.post("auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  // Edit Profile
  const editProfile = async (updatedData) => {
    try {
      const { data } = await axios.put("auth/edit", updatedData);
      setUser(data); 
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, editProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
