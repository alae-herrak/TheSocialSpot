import { useEffect, useState } from "react";

import { PostProps, User } from "../../types";
import {
  CommentDark,
  CommentLight,
  HeartDark,
  HeartLight,
} from "../../assets/images";
import { getUserById } from "../../api/user";

const Post = ({
  theme,
  profilePicture,
  fullName,
  date,
  textContent,
  photo,
  user_id,
}: PostProps) => {
  const postDate = new Date(date);
  const formatedDate = postDate.toDateString();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    user_id && getUserById(user_id).then((res) => setUser(res.data));
  }, []);

  return (
    <div
      className={`bg-${
        theme === "dark" ? "dark" : "light"
      } rounded-2 border border-1 border-dark-subtle p-3 mb-3`}
    >
      <div className="d-flex align-items-center mb-3">
        <img
          src={user?.profilePicture || profilePicture}
          style={{
            aspectRatio: "1/1",
            objectFit: "contain",
            backgroundColor: theme === "light" ? "white" : "black",
          }}
          className="width-2rem rounded-circle me-2 border border-1 border-dark-subtle"
        />
        <h6 className="m-0 me-1">{user?.fullName || fullName}</h6>
        <small>| {formatedDate}</small>
      </div>
      {textContent && (
        <div className="w-100 mb-2">
          <p>{textContent}</p>
        </div>
      )}
      {photo && (
        <div className="w-100 mb-2">
          <img src={photo} className="img-fluid" />
        </div>
      )}
      <div className="d-flex">
        <button className="btn p-1 me-2 d-flex align-items-center">
          <img
            src={theme === "light" ? HeartDark : HeartLight}
            className="width-1-5rem me-1 rounded-circle"
          />
          <span className="fw-bold">0</span>
        </button>
        <button className="btn p-1 d-flex align-items-center">
          <img
            src={theme === "light" ? CommentDark : CommentLight}
            className="width-1-5rem me-1"
          />
          <span className="fw-bold">0</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
