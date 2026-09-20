import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Vault from "./pages/vault/Vault";
import AddCredential from "./components/AddCredential";
import EditCredential from "./components/EditCredential";
import RecycleCredential from "./components/RecycleCredential";
import PasswordGenerator from "./components/PasswordGenerator";
import PasswordHealth from "./pages/PasswordHealth";
import Dashboard from "./pages/dashboard/Dashboard";
import Trash from "./pages/Trash";
import Settings from "./pages/Settings";

import PasswordGeneratorPage from "./pages/PasswordGeneratorPage";
import ReceivedShares from "./pages/sharing/ReceivedShares";
import SentShares from "./pages/sharing/SentShares";
import Teams from "./pages/team/Teams";
import ViewCredential from "./pages/sharing/ViewCredential";
import TeamDetails from "./pages/team/TeamDetails";
import AddTeamCredential from "./pages/team/AddTeamCredential";
import EditTeamCredential from "./pages/team/EditTeamCredential";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vault"
          element={
            <ProtectedRoute>
              <Vault />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-credential"
          element={
            <ProtectedRoute>
              <AddCredential />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-credential/:id"
          element={
            <ProtectedRoute>
              <EditCredential />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recycle-credential"
          element={
            <ProtectedRoute>
              <RecycleCredential />
            </ProtectedRoute>
          }
        />

        <Route
          path="/password-generator"
          element={
            <ProtectedRoute>
              <PasswordGeneratorPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/password-health"
          element={
            <ProtectedRoute>
              <PasswordHealth />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trash"
          element={
            <ProtectedRoute>
              <Trash />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shared-with-me"
          element={
            <ProtectedRoute>
              <ReceivedShares />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-shares"
          element={
            <ProtectedRoute>
              <SentShares />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teams"
          element={
            <ProtectedRoute>
              <Teams />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teams/:teamId"
          element={
            <ProtectedRoute>
              <TeamDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teams/:teamId/add-credential"
          element={
            <ProtectedRoute>
              <AddTeamCredential />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teams/:teamId/edit-credential/:teamCredentialId"
          element={
            <ProtectedRoute>
              <EditTeamCredential />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
