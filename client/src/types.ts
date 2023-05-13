import { store } from "./store";
export type RootState = ReturnType<typeof store.getState>

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
