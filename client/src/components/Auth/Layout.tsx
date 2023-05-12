import { LayoutProps } from "../../types";
import { RootState } from "../../types";
import { useSelector, useDispatch } from "react-redux/es/exports";

import Logo from "../../assets/images/logo.svg";
import ThemeDarkToggle from "../../assets/images/theme-dark.png";
import ThemeLightToggle from "../../assets/images/theme-light.png";
import { dark, light } from "../../redux/themeSlice";

const Layout = (props: LayoutProps) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleSwitchTheme = () => {
    dispatch(theme === "light" ? dark() : light());
  };

  return (
    <div className="container-fluid">
      <button className="btn position-absolute end-0">
        <img
          src={theme === "light" ? ThemeDarkToggle : ThemeLightToggle}
          alt="toggle theme"
          width="32px"
          onClick={handleSwitchTheme}
        />
      </button>
      <div className="row full-height">
        <div
          className={`col-3 col-md-6 d-none d-sm-flex flex-column flex-md-row align-items-center justify-content-center text-center text-white ${
            theme === "light"
              ? "custom-background-light"
              : "custom-background-dark"
          }`}
        >
          <img src={Logo} alt="" className="logo me-2" />
          <h1 className="m-2 d-none d-md-block">
            the<span className="fw-bold">SocialSpot</span>
          </h1>
        </div>
        <div className="col-12 col-sm-9 col-md-6 d-flex flex-column align-items-center justify-content-center">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
