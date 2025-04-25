import { useEffect, useState } from "react";

function Home() {
  const [message, setMessage] = useState("Backend Hellooo");

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/notes")
      .then((res) => res.json())
      .then((data) => {
        console.log(" 👽 Response from the Backend:", data);
        setMessage("Connected to the Backend 😂");
      })
      .catch((err) => {
        console.error("Failed to connect", err);
        setMessage("Could not reach backend");
      });
  }, []);

  return <h1>{message}</h1>;
}

export default Home;
