import { store } from "./store";
export type RootState = ReturnType<typeof store.getState>;

export type LayoutProps = {
  children: React.ReactNode;
};

export type User = {
  user_id: number | undefined;
  fullName: string;
  email: string;
  password: string;
  profilePicture: string;
  state: string | undefined;
  role: string | undefined;
  theme: string;
};

export type GoogleUser = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
};

export type UserWithToken = {
  user: User;
  token: string;
};

export type UserThemeProps = {
  user: User;
  theme: string;
};

export type UserThemeUpdateFeedProps = {
  user: User;
  theme: string;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

export type Post = {
  post_id: number;
  user_id: number;
  textContent: string;
  photo: string;
  date: Date;
  edited: boolean;
};

export type PostToCreate = {
  user_id: number;
  textContent: string;
  photo: string;
  date: Date;
  edited: boolean;
};

export type PostProps = {
  loggedUserId: number;
  theme: string;
  key: number;
  post_id: number;
  profilePicture: string;
  fullName: string;
  date: Date;
  textContent: string;
  photo: string;
  user_id: number | undefined;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>> | undefined;
};

export type Relation = {
  relation_id: number | undefined;
  user_id1: number;
  user_id2: number;
  state: string;
};

export type ActionButtonProps = {
  user_id1: number;
  user_id2: number;
  setIsFriend: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  theme: string;
};

export type Like = {
  like_id: number | undefined;
  type: "post" | "comment";
  target_id: number;
  user_id: number;
};

export type LikeCount = {
  [key: string]: number;
};

export type PostLikesProps = {
  post_id: number;
  likeCount: number;
  theme: string;
  loggedUserId: number;
};

export type Comment = {
  comment_id: number | undefined;
  post_id: number;
  user_id: number;
  comment: string;
  edited: boolean | undefined;
};

export type CommentCount = {
  [key: string]: number;
};

export type PostCommentsProps = {
  post_id: number;
  commentCount: number;
  theme: string;
  loggedUserId: number;
};

export type CommentProps = {
  comment_id: number;
  user_id: number;
  comment: string;
  theme: string;
  loggedUserId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
}