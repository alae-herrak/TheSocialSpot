import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PostProps, User } from "../../types";
import {
  HeartDark,
  HeartLight,
  HeartFull,
  DotsDark,
  DotsLight,
  Delete,
  EditLight,
  EditDark,
} from "../../assets/images";
import { getUserById } from "../../api/user";
import { deletePost, updatePost } from "../../api/post";
import {
  createPostLike,
  getPostLikeCount,
  getPostLikeUserIds,
  deleteLike,
  getLikeId,
} from "../../api/like";
import PostLikes from "./PostLikes";
import PostComments from "./PostComments";
import { getCommentsCountOfPostId } from "../../api/comment";

const Post = ({
  loggedUserId,
  theme,
  post_id,
  profilePicture,
  fullName,
  date,
  textContent,
  photo,
  edited,
  user_id,
  setPosts,
}: PostProps) => {
  const postDate = new Date(date);
  const formatedDate = postDate.toDateString();
  const [user, setUser] = useState<User>();
  const [likeCount, setLikeCount] = useState<number>(0);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [editing, setEditing] = useState<boolean>(false);
  const [newTextContent, setNewTextContent] = useState<string>(textContent);
  const [newPhoto, setNewPhoto] = useState<string>(photo);

  useEffect(() => {
    user_id && getUserById(user_id).then((res) => setUser(res.data));
    getPostLikeCount(post_id).then((res) => {
      setLikeCount(res.data["count(*)"]);
    });
    getPostLikeUserIds(post_id).then((res) => {
      if (res.data.length) {
        if (res.data.find((e) => e.user_id === loggedUserId))
          setUserLiked(true);
      }
    });
    getCommentsCountOfPostId(post_id).then((res) => {
      setCommentCount(res.data["count(*)"]);
    });
  }, []);

  const handleDeletePost = () => {
    deletePost(post_id)
      .then(() => {
        setPosts!((prev) => prev.filter((p) => p.post_id !== post_id));
      })
      .catch((err) => console.log(err));
  };

  const handleLikeButtonClick = () => {
    if (userLiked) {
      getLikeId(post_id, loggedUserId).then((res) => {
        deleteLike(res.data["like_id"]).then(() => {
          setLikeCount((prev) => prev - 1);
          setUserLiked(false);
        });
      });
    } else {
      createPostLike(post_id, loggedUserId).then(() => {
        setLikeCount((prev) => prev + 1);
        setUserLiked(true);
      });
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setNewPhoto(reader.result as string);
        };
      } else {
        alert("Please select an image file");
      }
    }
  };

  const handleEditPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTextContent.trim() === textContent && newPhoto === photo)
      return setEditing(false);
    if (textContent.trim() === "" && newPhoto === "") return;
    updatePost(post_id, newTextContent, newPhoto)
      .then((res) => {
        if (res.data)
          setPosts!((prev) => [
            res.data,
            ...prev.filter((p) => p.post_id !== post_id),
          ]);
        setEditing(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={`bg-${
        theme === "dark" ? "dark" : "light"
      } rounded-2 border border-1 border-dark-subtle p-3 mb-3`}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-1 align-items-center">
          <Link
            to={user_id === loggedUserId ? "/profile" : `/user/${user_id}`}
            className="d-flex align-items-center text-decoration-none text-body"
          >
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
          </Link>
          <small>| {formatedDate}</small>
          {edited ? (
            <small className="fw-normal">
              <i>- Edited</i>
            </small>
          ) : (
            ""
          )}
        </div>
        {user_id === loggedUserId && (
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
            <ul className="dropdown-menu">
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
                  data-bs-toggle="modal"
                  data-bs-target="#confirmationModal"
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
        <form
          className="w-100 d-flex flex-column gap-3"
          onSubmit={handleEditPost}
        >
          <textarea
            name="textContent"
            className="form-control"
            rows={3}
            value={newTextContent}
            onChange={(e) => setNewTextContent(e.target.value)}
          ></textarea>
          {newPhoto ? (
            <div className="w-100 d-flex align-items-center gap-3 position-relative">
              <img src={newPhoto} className="img-fluid" alt="" />
              <div className="position-absolute top-0 start-0 p-1">
                <label htmlFor="newPhoto" className="btn btn-secondary btn-sm">
                  Edit
                </label>
              </div>

              <div className="position-absolute top-0 end-0 p-1">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => setNewPhoto("")}
                >
                  X
                </button>
              </div>
            </div>
          ) : (
            <label htmlFor="newPhoto" className="btn btn-secondary">
              Add photo
            </label>
          )}
          <input
            type="file"
            className="d-none"
            id="newPhoto"
            accept="image/*"
            onChange={handleFileInputChange}
          />
          <div>
            <button
              type="button"
              className="btn btn-sm btn-secondary me-1"
              onClick={() => {
                setEditing(false);
                setNewTextContent(textContent);
                setNewPhoto(photo);
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              Save
            </button>
          </div>
        </form>
      ) : (
        <>
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
            <div className="btn p-1 me-2 d-flex align-items-center border-0">
              <img
                src={
                  userLiked
                    ? HeartFull
                    : theme === "light"
                    ? HeartDark
                    : HeartLight
                }
                className="width-1-5rem me-1"
                onClick={handleLikeButtonClick}
              />
              <PostLikes
                post_id={post_id}
                likeCount={likeCount}
                theme={theme}
                loggedUserId={loggedUserId}
              />
            </div>
            <PostComments
              post_id={post_id}
              commentCount={commentCount}
              theme={theme}
              loggedUserId={loggedUserId}
            />
          </div>
        </>
      )}
      <div
        className="modal fade"
        id="confirmationModal"
        tabIndex={-1}
        aria-labelledby="confirmationModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Confirm your choice
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Delete this post?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cacnel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleDeletePost}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
