import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./routes/Profile";

function App() {
  return (
    <>
      <Header />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "3em" }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
