import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/Login";
// import RegisterPage from "./pages/Register";
// import NotesPage from "./pages/NotesPage"; // Your notes page

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        {/* <Route path="/notes" element={<NotesPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
