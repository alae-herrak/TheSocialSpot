import { useEffect, useState } from "react";

import { PostLikesProps, User } from "../../types";
import { getPostLikeUserIds } from "../../api/like";
import { getUserById } from "../../api/user";

const PostLikes: React.FC<PostLikesProps> = ({
  post_id,
  likeCount,
  theme,
  loggedUserId,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getPostLikeUserIds(post_id).then((res) => {
      if (res.data.length) {
        res.data.map((e) => {
          getUserById(e.user_id).then((res) =>
            setUsers((prev) => [...prev, res.data])
          );
        });
      }
    });
  }, []);

  return (
    <>
      <span
        className="fw-bold"
        data-bs-toggle="modal"
        data-bs-target={`#${post_id}`}
      >
        {likeCount}
      </span>
      <div
        className="modal fade"
        id={`${post_id}`}
        tabIndex={-1}
        aria-labelledby="likes"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Likes
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex flex-column">
              {!users.length ? (
                <div className="text-center p-2">
                  This post has no likes yet
                </div>
              ) : (
                users.map((user) => (
                  <a
                    href={
                      user.user_id === loggedUserId
                        ? "/profile"
                        : `/user/${user.user_id}`
                    }
                    key={user.user_id}
                    className="d-flex align-items-center gap-3 p-2 text-decoration-none text-body"
                  >
                    <img
                      src={user.profilePicture}
                      referrerPolicy="no-referrer"
                      style={{
                        aspectRatio: "1/1",
                        objectFit: "contain",
                        backgroundColor: theme === "light" ? "white" : "black",
                      }}
                      className="width-2-5rem rounded-circle"
                      alt=""
                    />
                    <p className="m-0">{user.fullName}</p>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostLikes;
