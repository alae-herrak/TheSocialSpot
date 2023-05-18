import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Navbar from "./Navbar";
import { RootState } from "../../types";
import { useState } from "react";

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const [navigate, setNavigate] = useState<boolean>(false);

  return (
    <>
      {!user?.user_id && <Navigate to="/login" />}
      <Navbar />
    </>
  );
};

export default Home;
