import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { UserThemeProps, User, Post } from "../../types";
import { getUserById } from "../../api/user";
import ActionButton from "../Search/ActionButton";
import { getPostsOfUserId } from "../../api/post";
import POST from "../Home/Post";
import { getRelationOfTwoUserIds } from "../../api/relation";

const Profile: React.FC<UserThemeProps> = ({ user, theme }: UserThemeProps) => {
  const { user_id } = useParams<string>();

  const [targetUser, setTargetUser] = useState<User>();
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [called, setCalled] = useState<boolean>(false);

  useEffect(() => {
    getUserById(parseInt(user_id!))
      .then((res) => {
        setTargetUser(res.data);
        getRelationOfTwoUserIds(user.user_id!, parseInt(user_id!)).then(
          (res) => {
            if (res.data && res.data.state === "friends") {
              setIsFriend(true);
            }
          }
        );
      })
      .catch((err) => console.error(err));
  }, [user_id]);

  const getPosts = () => {
    if (!called) {
      getPostsOfUserId(targetUser!.user_id!)
        .then((res) => {
          setLoading(false);
          setPosts(res.data.reverse());
        })
        .catch((err) => console.error(err));
      setCalled(true);
    }
  };

  isFriend && getPosts();

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
          />
        </div>
        <div className="col-12 col-md-8 p-0 px-md-2 my-2">
          {isFriend ? (
            <>
              {loading && (
                <div className="full-height w-100 d-flex justify-content-center align-items-center">
                  <div className="spinner-border"></div>
                </div>
              )}
              {!posts.length && (
                <div className="w-100 d-flex justify-content-center align-items-center">
                  <b>{targetUser?.fullName}</b>&nbsp;has no posts yet.
                </div>
              )}
              {posts.map((post) => (
                <POST
                  theme={theme}
                  key={post.post_id}
                  profilePicture={targetUser!.profilePicture}
                  fullName={targetUser!.fullName}
                  date={post.date}
                  textContent={post.textContent}
                  photo={post.photo}
                />
              ))}
            </>
          ) : (
            <p className="text-center p-5">
              Add <b>{targetUser?.fullName}</b> to see their posts.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
