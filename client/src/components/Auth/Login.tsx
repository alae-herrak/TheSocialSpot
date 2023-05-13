import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { useGoogleLogin } from "@react-oauth/google";
import { getGoogleUserInfo } from "../../api/googleOAuth";
import { GoogleUser, RootState, User } from "../../types";
import { checkLogin, createUser, getUserByEmail } from "../../api/user";
import { useSelector } from "react-redux";

import GoogleLogo from "../../assets/images/google.png";

const Login: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(".");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (email.trim() === "" || password.trim() === "") {
      setErrorMessage("All fields are required");
      setLoading(false);
    } else {
      setLoading(true);
      checkLogin(email, password)
        .then((res) => {
          setLoading(false);
          if (!res.data) {
            setErrorMessage("Email or password incorrect");
          } else {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const GoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      const access_token = response.access_token;
      setLoading(true);
      getGoogleUserInfo(access_token)
        .then((res) => {
          const GoogleUser: GoogleUser = res.data;
          getUserByEmail(GoogleUser.email)
            .then((res) => {
              if (!res.data) {
                const user: User = {
                  user_id: parseInt(GoogleUser.id),
                  fullName: GoogleUser.name,
                  email: GoogleUser.email,
                  password: "",
                  profilePicture: GoogleUser.picture,
                  state: undefined,
                  role: undefined,
                  theme,
                };
                createUser(user)
                  .then((res) => {
                    console.log(res.data);
                    setLoading(false);
                  })
                  .catch((err) => {
                    console.log(err);
                    setLoading(false);
                  });
              } else {
                console.log(res.data);
                setLoading(false);
              }
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  return (
    <Layout>
      {loading && (
        <div className="loader">
          <div className="spinner-grow"></div>
        </div>
      )}
      <h2 className="mb-5">Hello again!</h2>
      <form onSubmit={handleLogin}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <p
          className={`text-danger mb-3 ${
            errorMessage === "." ? "opacity-0" : ""
          }`}
        >
          {errorMessage}
        </p>
        <button className="btn btn-primary btn-lg w-100 mb-3">Login</button>
        <button
          type="button"
          className="btn btn-light btn-lg w-100 d-flex justify-content-center align-items-center"
          onClick={() => GoogleLogin()}
        >
          <img
            src={GoogleLogo}
            alt=""
            className="img-fluid me-2"
            width="20px"
          />
          <span style={{ fontSize: "smaller" }}>Continue with Google</span>
        </button>
      </form>
      <p className="position-absolute bottom-0 mb-5">
        Don't have an account?{" "}
        <Link to="/register" className="text-decoration-none fw-bold">
          Register
        </Link>
      </p>
    </Layout>
  );
};

export default Login;
