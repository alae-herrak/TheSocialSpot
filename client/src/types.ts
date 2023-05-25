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
