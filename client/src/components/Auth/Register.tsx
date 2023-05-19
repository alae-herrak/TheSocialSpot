import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";

import Layout from "./Layout";
import { createUser, getAllUsers, getUserByEmail } from "../../api/user";
import { GoogleUser, RootState, User } from "../../types";
import { getGoogleUserInfo } from "../../api/googleOAuth";
import { login } from "../../redux/userSlice";
import GoogleLogo from "../../assets/images/google.png";
import { dark, light } from "../../redux/themeSlice";

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const noProfilePicture = import.meta.env.VITE_NO_PROFILE_PICTURE;

  const [navigate, setNavigate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(".");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [profilePicture, setProfilePicture] =
    useState<string>(noProfilePicture);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setProfilePicture(reader.result as string);
        };
      } else {
        setErrorMessage("The file is not an image");
      }
    }
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      passwordConfirmation.trim() === ""
    ) {
      setErrorMessage("All fields marked (*) are required");
      setLoading(false);
    } else {
      if (password !== passwordConfirmation) {
        setErrorMessage("Passwords do not match");
        setLoading(false);
      } else {
        getAllUsers().then((res) => {
          const match: User[] = res.data.filter((item) => item.email === email);
          if (match.length) {
            setErrorMessage("Email is already taken");
            setLoading(false);
          } else {
            const user: User = {
              user_id: undefined,
              fullName,
              email,
              password,
              profilePicture,
              state: undefined,
              role: undefined,
              theme,
            };
            setLoading(true);
            createUser(user)
              .then((res) => {
                setLoading(false);
                const { user, token } = res.data;
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
                dispatch(login());
                setNavigate(true);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
          }
        });
      }
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
                    setLoading(false);
                    const { user, token } = res.data;
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", token);
                    dispatch(login());
                    setNavigate(true);
                  })
                  .catch((err) => {
                    console.log(err);
                    setLoading(false);
                  });
              } else {
                setLoading(false);
                const { user, token } = res.data;
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
                dispatch(user.theme === "light" ? light() : dark());
                dispatch(login());
                setNavigate(true);
              }
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    },
  });

  return (
    <Layout>
      {navigate && <Navigate to="/" />}
      {loading && (
        <div className="loader">
          <div className="spinner-grow"></div>
        </div>
      )}
      <h2 className="mb-5">New here? Register now!</h2>
      <form onSubmit={handleRegister}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput1"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label htmlFor="floatingInput1">Full Name *</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput2">Email *</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword1">Password *</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword2"
            placeholder="Password confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <label htmlFor="floatingPassword2">Password confirmation *</label>
        </div>
        <div className="mb-3 d-flex align-items-center">
          <img
            src={profilePicture}
            alt=""
            style={{ width: "64px", height: "64px" }}
            className="img-fluid rounded-circle me-2"
          />

          <label htmlFor="profilePicture" className="btn w-100 border p-2 p-sm-3">
            Choose a profile picture
          </label>

          {profilePicture !== noProfilePicture && (
            <button
              type="button"
              className="btn btn-outline-danger ms-2 p-3"
              onClick={() => {
                setProfilePicture(noProfilePicture);
                (
                  document.getElementById("profilePicture") as HTMLInputElement
                ).value = "";
              }}
            >
              X
            </button>
          )}

          <input
            type="file"
            className="form-control d-none"
            id="profilePicture"
            placeholder="profilePicture"
            aria-label="profilePicture"
            aria-describedby="basic-addon1"
            accept="image/*"
            onChange={handleFileInputChange}
          />
        </div>
        <p
          className={`text-danger mb-3 ${
            errorMessage === "." ? "opacity-0" : ""
          }`}
        >
          {errorMessage}
        </p>
        <button className="btn btn-primary btn-lg w-100 mb-3">Register</button>
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
      <p className="position-absolute bottom-0 mb-3 mb-sm-5">
        Already have an account?{" "}
        <Link to="/login" className="text-decoration-none fw-bold">
          Login
        </Link>
      </p>
    </Layout>
  );
};

export default Register;
