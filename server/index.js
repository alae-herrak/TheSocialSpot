import express from "express";
import cors from "cors";

import UserRouter from "./Routes/user.js";
import PostRouter from "./Routes/post.js";
import RelationRouter from "./Routes/relation.js";
import LikeRouter from "./Routes/like.js";
import CommentRouter from "./Routes/comment.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/users", UserRouter);
app.use("/posts", PostRouter);
app.use("/relations", RelationRouter);
app.use("/likes", LikeRouter);
app.use("/comments", CommentRouter);

app.listen(PORT, () =>
  console.log(`Server running on: http://localhost:${PORT}`)
);
