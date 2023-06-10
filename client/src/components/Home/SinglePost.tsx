import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import POST from "./Post";
import { Post, User, UserThemeProps } from "../../types";
import { getPostById } from "../../api/post";
import { getUserById } from "../../api/user";

const SinglePost: React.FC<UserThemeProps> = ({ user, theme }) => {
  const { post_id } = useParams<string>();
  const [post, setPost] = useState<Post>();
  const [postUser, setPostUser] = useState<User>();

  useEffect(() => {
    getPostById(parseInt(post_id!)).then((res) => {
      setPost(res.data);
      getUserById(res.data.user_id).then((res) => {
        setPostUser(res.data);
      });
    });
  }, []);

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-2 col-lg-3 d-none d-md-block"></div>
        <div className="col">
          <POST
            key={post?.post_id!}
            user_id={post?.user_id}
            post_id={post?.post_id!}
            loggedUserId={user.user_id!}
            theme={theme}
            date={post?.date!}
            edited={post?.edited!}
            photo={post?.photo!}
            textContent={post?.textContent!}
            fullName={postUser?.fullName!}
            profilePicture={postUser?.profilePicture!}
            setPosts={undefined}
          />
        </div>
        <div className="col-2 col-lg-3 d-none d-md-block"></div>
      </div>
    </div>
  );
};

export default SinglePost;
