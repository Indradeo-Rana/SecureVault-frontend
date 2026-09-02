import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Vault from "./pages/vault/Vault";
import AddCredential from "./components/AddCredential";
import EditCredential from "./components/EditCredential";
import RecycleCredential from "./components/RecycleCredential";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/vault"
          element={
            <ProtectedRoute>
              <Vault />
            </ProtectedRoute>
          }
        />
        <Route path="/add-credential" element={
          <ProtectedRoute>
            <AddCredential />
          </ProtectedRoute>
          } />
        <Route path="/edit-credential/:id" element={ 
           <ProtectedRoute><EditCredential /></ProtectedRoute>} />
        <Route path="/recycle-credential" element={
          <ProtectedRoute><RecycleCredential /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
