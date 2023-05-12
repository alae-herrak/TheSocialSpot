import { FC } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";

import GoogleLogo from "../../assets/images/google.png";

const Login: FC = () => {
  return (
    <Layout>
      <h2 className="mb-5">Hello again!</h2>
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
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <p className="text-danger mb-3 opacity-0">.</p>
        <button className="btn btn-primary btn-lg w-100 mb-3">Login</button>
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
