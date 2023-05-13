import axios from "axios";

export const getGoogleUserInfo = async (access_token: string) => {
  return await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
  );
};
