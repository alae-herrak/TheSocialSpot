import { useEffect, useState } from "react";

import { CommentDark, CommentLight } from "../../assets/images";
import { PostCommentsProps, Comment } from "../../types";
import { createComment, getCommentsOfPostId } from "../../api/comment";
import COMMENT from "./Comment";

const PostComments: React.FC<PostCommentsProps> = ({
  post_id,
  commentCount,
  theme,
  loggedUserId,
}) => {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getCommentsOfPostId(post_id).then((res) => setComments(res.data.reverse()));
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim() === "" || comment.length > 255) return;
    const newComment: Comment = {
      comment_id: undefined,
      post_id,
      user_id: loggedUserId,
      comment,
      edited: false,
    };
    createComment(newComment)
      .then((res) => {
        setComments((prev) => [res.data, ...prev]);
        setComment("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        className="btn p-1 d-flex align-items-center border-0"
        data-bs-toggle="modal"
        data-bs-target={`#${post_id}Comments`}
      >
        <img
          src={theme === "light" ? CommentDark : CommentLight}
          className="width-1-5rem me-1"
        />
        <span className="fw-bold">{commentCount}</span>
      </div>

      <div
        className="modal fade"
        id={`${post_id}Comments`}
        tabIndex={-1}
        aria-labelledby="likes"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Comments
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-0 d-flex flex-column justify-content-between height-75">
              <div className="d-flex flex-column gap-1 overflow-auto">
                {comments.map((c) => (
                  <COMMENT
                    key={c.comment_id}
                    comment_id={c.comment_id!}
                    user_id={c.user_id}
                    comment={c.comment}
                    edited={c.edited}
                    theme={theme}
                    loggedUserId={loggedUserId}
                    setComments={setComments}
                  />
                ))}
              </div>
              <form className="w-100 p-2 mt-4" onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  className="form-control"
                  name="commentInput"
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostComments;
