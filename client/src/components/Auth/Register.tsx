import { FC } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";

import GoogleLogo from "../../assets/images/google.png";

const Register: FC = () => {
  return (
    <Layout>
      <h2 className="mb-5">New here? Register now!</h2>
      <form>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Username"
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="Email"
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password confirmation"
          />
          <label htmlFor="floatingPassword">Password confirmation</label>
        </div>
        <div className="mb-3">
          <label htmlFor="profilePicture" className="btn border w-100 p-3">
            Choose a profile picture
          </label>
          <input
            type="file"
            className="form-control d-none"
            id="profilePicture"
            placeholder="profilePicture"
            aria-label="profilePicture"
            aria-describedby="basic-addon1"
          />
        </div>
        <p className="text-danger mb-3 opacity-0">.</p>
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
      <p className="position-absolute bottom-0 mb-3">
        Already have an account?{" "}
        <Link to="/login" className="text-decoration-none fw-bold">
          Login
        </Link>
      </p>
    </Layout>
  );
};

export default Register;
