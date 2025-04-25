import { useState, useEffect } from "react";
import Home from "./pages/Home";
import "./App.css";

// const loginUser = async () => {
//   const res = await fetch("/api/v1/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });

//   const data = await res.json();
//   if (res.ok) {
//     localStorage.setItem("token", data.authorization);
//   }
// };
function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
