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
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

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
  theme: string;
  key: number;
  profilePicture: string;
  fullName: string;
  date: Date;
  textContent: string;
  photo: string;
  user_id: number | undefined;
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
};
