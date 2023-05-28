import { useEffect, useState } from "react";

import { Post, UserThemeProps } from "../../types";
import { getPostsOfUserId } from "../../api/post";
import POST from "../Home/Post";
import { Navigate } from "react-router-dom";

const Profile: React.FC<UserThemeProps> = ({ user, theme }: UserThemeProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPostsOfUserId(user.user_id!)
      .then((res) => {
        setLoading(false);
        setPosts(res.data.reverse());
      })
      .catch((err) => console.error(err));
  }, []);

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
            src={user.profilePicture}
            referrerPolicy="no-referrer"
            alt=""
            style={{
              aspectRatio: "1/1",
              objectFit: "contain",
              backgroundColor: theme === "light" ? "white" : "black",
            }}
            className="img-fluid rounded-circle w-25 mb-3 border border-1 border-dark-subtle"
          />
          <h2>{user.fullName}</h2>
          <p className="lead">{user.email}</p>
        </div>
        <div className="col-12 col-md-8 p-0 px-md-2 my-2">
          {loading && (
            <div className="full-height w-100 d-flex justify-content-center align-items-center">
              <div className="spinner-border"></div>
            </div>
          )}
          {!posts.length && (
            <div className="w-100 d-flex justify-content-center align-items-center">
              You have no posts
            </div>
          )}
          {posts.map((post) => (
            <POST
              theme={theme}
              key={post.post_id}
              profilePicture={user.profilePicture}
              fullName={user.fullName}
              date={post.date}
              textContent={post.textContent}
              photo={post.photo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
