import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { RootState, Post } from "../../types";
import NewPost from "./NewPost";
import { getRelationsOfUserId } from "../../api/relation";
import { getPostsOfUserId } from "../../api/post";
import POST from "./Post";

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user!);
  const theme = useSelector((state: RootState) => state.theme.theme);

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts([]);
    getRelationsOfUserId(user.user_id!)
      .then((res) => {
        if (res.data) {
          res.data.map((relation) => {
            if (relation.state === "friends") {
              getPostsOfUserId(
                relation.user_id1 === user.user_id
                  ? relation.user_id2
                  : relation.user_id1
              ).then((res) => {
                if (res.data) {
                  res.data.map((post) => setPosts((prev) => [...prev, post]));
                }
              });
            }
          });
        }
      })
      .catch((err) => console.log(err));
    getPostsOfUserId(user.user_id!).then((res) => {
      if (res.data) {
        res.data.map((post) => setPosts((prev) => [...prev, post]));
      }
    });
  }, []);

  posts.sort((a, b) => b.post_id - a.post_id);

  return (
    <>
      {!user?.user_id && <Navigate to="/login" />}
      <div className="container">
        <div className="row p-2">
          <NewPost user={user} theme={theme} setPosts={setPosts} />
          <div className="col-0 col-lg-1"></div>
          <div className="col-12 col-lg-5 p-0 ">
            {posts.map((post) => (
              <POST
                loggedUserId={user.user_id!}
                theme={theme}
                key={post.post_id}
                post_id={post.post_id}
                profilePicture=""
                fullName=""
                date={post.date}
                textContent={post.textContent}
                photo={post.photo}
                user_id={post.user_id}
                setPosts={setPosts}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
