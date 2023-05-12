import Logo from "../../assets/images/logo.svg";

type LayoutProps = {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  return (
    <div className="container-fluid">
      <div className="row full-height">
        <div className="col-3 col-md-6 d-none d-sm-flex flex-column flex-md-row align-items-center justify-content-center text-center text-white custom-background-light">
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
