import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { UserThemeProps, User } from "../../types";
import { getUserById } from "../../api/user";
import ActionButton from "../Search/ActionButton";

const Profile: React.FC<UserThemeProps> = ({ user, theme }: UserThemeProps) => {
  const { user_id } = useParams<string>();

  const [targetUser, setTargetUser] = useState<User>();
  const [isFriend, setIsFriend] = useState<boolean>(false);

  useEffect(() => {
    getUserById(parseInt(user_id!))
      .then((res) => setTargetUser(res.data))
      .catch((err) => console.error(err));
  }, [user_id]);

  return (
    <div className="container">
      {!user.user_id && <Navigate to="/login" />}
      <div className="row">
        <div
          className={`col-12 col-md-4 h-100 d-flex flex-column align-items-center rounded-3 my-2 py-5 border border-1 border-dark-subtle bg-${
            theme === "dark" ? "dark" : "light"
          }`}
        >
          <img
            src={targetUser?.profilePicture}
            referrerPolicy="no-referrer"
            alt=""
            style={{
              aspectRatio: "1/1",
              objectFit: "contain",
              backgroundColor: theme === "light" ? "white" : "black",
            }}
            className="img-fluid rounded-circle w-25 mb-3 border border-1 border-dark-subtle"
          />
          <h2>{targetUser?.fullName}</h2>
          <p className="lead">{targetUser?.email}</p>
          <ActionButton
            user_id1={user.user_id!}
            user_id2={targetUser?.user_id!}
            setIsFriend={setIsFriend}
          />
        </div>
        <div className="col-12 col-md-8 p-0 px-md-2 my-2">
          {isFriend && "posts"}
        </div>
      </div>
    </div>
  );
};

export default Profile;
