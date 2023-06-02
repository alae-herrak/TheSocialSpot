import { useEffect, useState } from "react";

import { PostProps, User } from "../../types";
import {
  CommentDark,
  CommentLight,
  HeartDark,
  HeartLight,
  HeartFull,
  DotsDark,
  DotsLight,
  Delete,
} from "../../assets/images";
import { getUserById } from "../../api/user";
import { deletePost } from "../../api/post";
import {
  createPostLike,
  getPostLikeCount,
  getPostLikeUserIds,
  deleteLike,
  getLikeId,
} from "../../api/like";
import { Link } from "react-router-dom";
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
  user_id,
  setPosts,
}: PostProps) => {
  const postDate = new Date(date);
  const formatedDate = postDate.toDateString();
  const [user, setUser] = useState<User>();
  const [likeCount, setLikeCount] = useState<number>(0);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [commentCount, setCommentCount] = useState<number>(0);

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

  return (
    <div
      className={`bg-${
        theme === "dark" ? "dark" : "light"
      } rounded-2 border border-1 border-dark-subtle p-3 mb-3`}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
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
          <small>| {formatedDate}</small>
        </Link>

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
                  className="dropdown-item d-flex align-items-center gap-1 text-danger"
                  onClick={handleDeletePost}
                >
                  <img src={Delete} className="width-1-5rem" alt="" />
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
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
        <div className="btn p-1 me-2 d-flex align-items-center border-0">
          <img
            src={
              userLiked ? HeartFull : theme === "light" ? HeartDark : HeartLight
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
    </div>
  );
};

export default Post;
