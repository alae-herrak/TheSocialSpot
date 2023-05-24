import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Navbar from "../Navbar";
import { RootState } from "../../types";
import ProfileInformation from "./ProfileInformation";
import Password from "./Password";
import DeleteAccount from "./DeleteAccount";

const Settings: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user!);
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <>
      {!user.user_id && <Navigate to="/login" />}
      <Navbar />
      <div className="container p-0 my-3">
        <ProfileInformation user={user} theme={theme} />
        <Password user={user} theme={theme}/>
        <DeleteAccount user={user} theme={theme}/>
      </div>
    </>
  );
};

export default Settings;
