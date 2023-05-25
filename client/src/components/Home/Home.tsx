import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "../../types";
import NewPost from "./NewPost";

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user!);
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <>
      {!user?.user_id && <Navigate to="/login" />}
      <div className="container">
        <div className="row p-2">
          <NewPost user={user} theme={theme} />
        </div>
      </div>
    </>
  );
};

export default Home;
