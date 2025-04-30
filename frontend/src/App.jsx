import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import Home from "./pages/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/notes");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/notes"
          element={
            <Notes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
