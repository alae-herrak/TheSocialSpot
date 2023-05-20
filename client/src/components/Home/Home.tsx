import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Navbar from "../Navbar";
import { RootState } from "../../types";


const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);


  return (
    <>
      {!user?.user_id && <Navigate to="/login" />}
      <Navbar />
    </>
  );
};

export default Home;