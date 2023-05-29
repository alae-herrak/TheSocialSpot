import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

import { RootState } from "./types";
import {
  Navbar,
  Home,
  Login,
  Register,
  Settings,
  Profile,
  Search,
  User,
} from "./components";

function App() {
  const user = useSelector((state: RootState) => state.user.user);
  const theme = useSelector((state: RootState) => state.theme.theme);
  document.querySelector("html")?.setAttribute("data-bs-theme", theme);
  document
    .querySelector("body")
    ?.setAttribute(
      "class",
      theme === "dark" ? "bg-dark-subtle" : "bg-secondary-subtle"
    );

  return (
    <div className="App">
      {user?.user_id && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={<Profile user={user!} theme={theme} />}
        />
        <Route
          path="/search/:searchTerm"
          element={<Search user={user!} theme={theme} />}
        />
        <Route
          path="/user/:user_id"
          element={<User user={user!} theme={theme} />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
