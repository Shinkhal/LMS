import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import LeadsList from "./pages/LeadsList";
import Profile from "./pages/profile";
import LeadForm from "./pages/AddLeads";
import LeadDetails from "./pages/LeadDetail";
import EditLead from "./pages/LeadEdit";
import Layout from "./components/Layout";
import EditProfile from "./pages/EditProfile";

import Loader from "./components/Loader";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/leads" />} />

        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/leads" />
            ) : (
              <Layout>
                <Home />
              </Layout>
            )
          }
        />

        {user && (
          <>
            <Route
              path="/leads"
              element={
                <Layout>
                  <LeadsList />
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            <Route
              path="/leads/new"
              element={
                <Layout>
                  <LeadForm />
                </Layout>
              }
            />
            <Route
              path="/leads/:id"
              element={
                <Layout>
                  <LeadDetails />
                </Layout>
              }
            />
            <Route
              path="/leads/edit/:id"
              element={
                <Layout>
                  <EditLead />
                </Layout>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <Layout>
                  <EditProfile />
                </Layout>
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
