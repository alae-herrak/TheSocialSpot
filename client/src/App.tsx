import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

import { RootState } from "./types";
import { Home, Login, Register } from "./components";

function App() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  document.querySelector("html")?.setAttribute("data-bs-theme", theme);
  document
    .querySelector("body")
    ?.setAttribute("class", theme === "dark" ? "bg-dark-subtle" : "");

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
