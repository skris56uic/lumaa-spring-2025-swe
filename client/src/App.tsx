import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Register from "./components/Register";
import { SnackbarProvider } from "./components/SnackBarContext";
import Login from "./components/Login";
import { UserProvider } from "./components/UserContext";
import Dashboard from "./components/Dashboard";

export const App: React.FC = () => {
  return (
    <>
      <UserProvider>
        <SnackbarProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </UserProvider>
    </>
  );
};
export default App;
