import { useSelector, useDispatch } from "react-redux";

import { logout } from "../redux/userSlice";
import { light, dark } from "../redux/themeSlice";
import { RootState } from "../types";
import {
  NavLogo,
  SearchIcon,
  NotificationIcon,
  ProfileDark,
  ProfileLight,
  ThemeDark,
  ThemeLight,
  SettingsDark,
  SettingsLight,
  LogoutDark,
  LogoutLight,
} from "../assets/images";
import { updateTheme } from "../api/user";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.user);
  const theme = useSelector((state: RootState) => state.theme.theme);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleUpdateTheme = () => {
    updateTheme(theme === "dark" ? "light" : "dark")
      .then((res) => localStorage.setItem("user", JSON.stringify(res.data)))
      .catch((err) => console.log(err));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm !== "") {
      navigate(`/search/${searchTerm.trim()}`);
      setSearchTerm(searchTerm.trim());
    }
  };

  return (
    <nav
      className={`navbar sticky-top ${
        theme === "light" ? "navbar-dark bg-primary" : "navbar-light bg-dark"
      }`}
    >
      <div className="container">
        <a href="/" className="navbar-brand d-flex align-items-center">
          <img src={NavLogo} alt="" className="width-2rem me-2" />
          <span className="d-none d-md-block">
            the<span className="fw-bold">SocialSpot</span>
          </span>
        </a>
        <div className="justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav d-flex flex-row align-items-center">
            <li className="nav-item me-4">
              <form
                onSubmit={handleFormSubmit}
                className="m-0 p-0 d-flex align-items-center w-100"
              >
                <div className="input-group">
                  <input
                    type="text"
                    name="search term"
                    className="form-control form-control-sm border-0 shadow-none bg-white text-black"
                    placeholder="Search users ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    type="button"
                    className={`input-group-text bg-white border-0 text-${
                      searchTerm === "" ? "white" : "black"
                    }`}
                    onClick={() => setSearchTerm("")}
                  >
                    x
                  </button>
                </div>
              </form>
            </li>
            <li className="nav-item dropdown me-4">
              <button className="btn border-0 p-0">
                <img
                  src={NotificationIcon}
                  className="width-1-5rem"
                  role="button"
                  data-bs-toggle="modal"
                  data-bs-target="#notifications"
                />
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
              </button>
              <div
                className="modal fade"
                id="notifications"
                tabIndex={-1}
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5">Notifications</h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <a
                        className="dropdown-item d-flex justify-content-between align-items-center"
                        href="#"
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src=""
                            alt=""
                            className="width-2rem rounded-circle me-3"
                          />
                          <p className="m-0">alaeherrak liked your post</p>
                        </div>
                        <img src="" alt="" className="width-2rem" />
                      </a>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary">
                        All notifications
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown">
              <img
                src={user?.profilePicture}
                referrerPolicy="no-referrer"
                style={{
                  aspectRatio: "1/1",
                  objectFit: "contain",
                  backgroundColor: theme === "light" ? "white" : "black",
                }}
                className="width-2rem p-0 rounded-circle border border-1 border-dark-subtle"
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#profile"
              />
              <div
                className="modal fade"
                id="profile"
                tabIndex={-1}
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5">{user?.fullName}</h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <a
                        href="/profile"
                        className="text-decoration-none text-body nav-link d-flex align-items-center"
                      >
                        <img
                          src={theme === "light" ? ProfileDark : ProfileLight}
                          className="width-1-5rem me-2"
                        />
                        Profile
                      </a>
                      <button
                        className="text-decoration-none text-body nav-link d-flex align-items-center"
                        onClick={() => {
                          dispatch(theme === "light" ? dark() : light());
                          handleUpdateTheme();
                        }}
                      >
                        <img
                          src={theme === "light" ? ThemeDark : ThemeLight}
                          className="width-1-5rem me-2"
                        />
                        Theme
                      </button>
                      <a
                        href="/settings"
                        className="text-decoration-none text-body nav-link d-flex align-items-center"
                      >
                        <img
                          src={theme === "light" ? SettingsDark : SettingsLight}
                          className="width-1-5rem me-2"
                        />
                        Settings
                      </a>
                      <a
                        href=""
                        className="text-decoration-none text-body nav-link d-flex align-items-center"
                        onClick={() => {
                          dispatch(logout());
                        }}
                      >
                        <img
                          src={theme === "light" ? LogoutDark : LogoutLight}
                          className="width-1-5rem me-2"
                        />
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
