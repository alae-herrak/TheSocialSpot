import { useEffect, useState } from "react";

import { CommentProps, User } from "../../types";
import { getUserById } from "../../api/user";
import {
  Delete,
  DotsDark,
  DotsLight,
  EditDark,
  EditLight,
  HeartDark,
  HeartFull,
  HeartLight,
} from "../../assets/images";
import { deleteComment, updateComment } from "../../api/comment";
import {
  createCommentLike,
  deleteLike,
  getCommentLikeCount,
  getCommentLikeUserIds,
  getLikeId,
} from "../../api/like";
import { createNotification, deleteNotification } from "../../api/notification";

const Comment: React.FC<CommentProps> = ({
  comment_id,
  user_id,
  comment,
  edited,
  theme,
  loggedUserId,
  setComments,
  postUser_id,
  post_id,
}) => {
  const [user, setUser] = useState<User>();
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [editing, setEditing] = useState<boolean>(false);
  const [newComment, setnewComment] = useState<string>(comment);

  useEffect(() => {
    getUserById(user_id).then((res) => setUser(res.data));
    getCommentLikeCount(comment_id).then((res) => {
      if (res.data) setLikeCount(res.data["count(*)"]);
    });
    getCommentLikeUserIds(comment_id).then((res) => {
      if (res.data.length) {
        if (res.data.find((e) => e.user_id === loggedUserId))
          setUserLiked(true);
      }
    });
  }, []);

  const handleEditComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment === newComment) return setEditing(false);
    if (newComment.trim() === "") return;
    updateComment(comment_id, newComment)
      .then((res) => {
        if (res.data)
          setComments((prev) => [
            res.data,
            ...prev.filter((c) => c.comment_id !== comment_id),
          ]);
        setEditing(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteComment = () => {
    deleteComment(comment_id).then((res) => {
      if (res.data) {
        setComments((prev) => [
          ...prev.filter((comment) => comment.comment_id !== comment_id),
        ]);
        loggedUserId !== postUser_id &&
          deleteNotification("comment", loggedUserId, postUser_id, post_id);
      }
    });
  };

  const handleLikeButtonClick = () => {
    if (userLiked) {
      getLikeId(comment_id, loggedUserId).then((res) => {
        deleteLike(res.data["like_id"]).then(() => {
          setLikeCount((prev) => prev - 1);
          setUserLiked(false);
          loggedUserId !== user_id &&
            deleteNotification("commentLike", loggedUserId, user_id, post_id);
        });
      });
    } else {
      createCommentLike(comment_id, loggedUserId).then(() => {
        setLikeCount((prev) => prev + 1);
        setUserLiked(true);
        loggedUserId !== user_id &&
          createNotification({
            notification_id: undefined,
            event: "commentLike",
            user_id1: loggedUserId,
            user_id2: user_id,
            ressource_id: post_id,
            opened: false
          });
      });
    }
  };

  return (
    <div className="d-flex align-items-start gap-2 m-2 ms-3">
      <a href={user_id === loggedUserId ? "/profile" : `/user/${user_id}`}>
        <img
          src={user?.profilePicture}
          style={{
            aspectRatio: "1/1",
            objectFit: "contain",
            backgroundColor: theme === "light" ? "white" : "black",
          }}
          className="rounded-circle mt-2 width-2rem border border-1 border-dark-subtle"
          alt=""
        />
      </a>
      <div className="d-flex flex-column p-2 shadow-sm border border-1 rounded-3 w-100">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-2">
            <a
              href={user_id === loggedUserId ? "/profile" : `/user/${user_id}`}
              className="text-decoration-none text-body"
            >
              <h6 className="fw-bold">{user?.fullName}</h6>
            </a>
            {edited ? (
              <small className="fw-normal">
                <i>- Edited</i>
              </small>
            ) : (
              ""
            )}
          </div>
          {user_id === loggedUserId && !editing && (
            <div className="dropdown">
              <button
                className="btn p-0 d-flex align-items-center border-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={theme === "dark" ? DotsLight : DotsDark}
                  className="width-1rem"
                  alt=""
                />
              </button>
              <ul className="dropdown-menu p-1">
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center gap-1"
                    onClick={() => setEditing(true)}
                  >
                    <img
                      src={theme === "dark" ? EditLight : EditDark}
                      className="width-1-5rem"
                      alt=""
                    />
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center gap-1 text-danger"
                    onClick={handleDeleteComment}
                  >
                    <img src={Delete} className="width-1-5rem" alt="" />
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        {editing ? (
          <form className="w-100" onSubmit={handleEditComment}>
            <input
              type="text"
              className="form-control mb-2"
              name="comment"
              value={newComment}
              onChange={(e) => setnewComment(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-sm btn-secondary me-1"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              Save
            </button>
          </form>
        ) : (
          <>
            <p className="m-0">{comment}</p>
            <div className="mt-2">
              <button
                className="btn p-0 d-flex align-items-center border-0"
                onClick={() => handleLikeButtonClick()}
              >
                <img
                  src={
                    userLiked
                      ? HeartFull
                      : theme === "dark"
                      ? HeartLight
                      : HeartDark
                  }
                  className="width-1-5rem me-1"
                  alt=""
                />
                {likeCount}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
