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

export type ProfileInformationProps = {
  user: User | null,
  theme: string
}

export type SettingsThemeProps = {
  theme: string
}