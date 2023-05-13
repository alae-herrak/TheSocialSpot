import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";

import GoogleLogo from "../../assets/images/google.png";
import { createUser, getAllUsers } from "../../api/user";
import { useSelector } from "react-redux";
import { RootState, User } from "../../types";

const Register: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const noProfilePicture = import.meta.env.VITE_NO_PROFILE_PICTURE;

  const [errorMessage, setErrorMessage] = useState<string>(".");
  const [username, setUsername] = useState<string>("");
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
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      passwordConfirmation.trim() === ""
    )
      setErrorMessage("All fields marked (*) are required");
    else {
      if (password !== passwordConfirmation)
        setErrorMessage("Passwords do not match");
      else {
        getAllUsers().then((res) => {
          const match: User[] = res.data.filter(
            (item) => item.username === username || item.email === email
          );
          if (match.length) {
            if (match[0].username === username)
              setErrorMessage("Username is already taken");
            if (match[0].email === email)
              setErrorMessage("Email is already taken");
          } else {
            const user: User = {
              user_id: undefined,
              username,
              email,
              password,
              profilePicture,
              state: undefined,
              role: undefined,
              theme,
            };
            createUser(user)
              .then((res) => console.log(res.data))
              .catch((err) => console.log(err));
          }
        });
      }
    }
  };

  return (
    <Layout>
      <h2 className="mb-5">New herex ? Register now!</h2>
      <form onSubmit={handleRegister}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput1"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="floatingInput1">Username *</label>
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
            style={{ width: "15%", height: "15%" }}
            className="img-fluid rounded-circle me-2"
          />

          <label htmlFor="profilePicture" className="btn w-100 border p-3">
            Choose a profile picture
          </label>

          {profilePicture !== noProfilePicture && (
            <button
              type="button"
              className="btn btn-outline-danger ms-2 p-3"
              onClick={() => setProfilePicture(noProfilePicture)}
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
        <button className="btn btn-light btn-lg w-100 d-flex justify-content-center align-items-center">
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
