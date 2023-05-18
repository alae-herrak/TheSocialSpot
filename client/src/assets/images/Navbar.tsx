import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../redux/userSlice";
import { light, dark } from "../../redux/themeSlice";
import { RootState } from "../../types"
import NavLogo from '../../assets/images/icons8-he-50.png'
import SearchIcon from '../../assets/images/search-light.png'
import NotificationIcon from '../../assets/images/notification-empty-light.png'

const Navbar: React.FC = () => {
  const dispatch = useDispatch;
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <nav className="navbar sticky-top navbar-dark bg-primary">
    <div className="container">
      <a className="navbar-brand d-flex align-items-center" href="#">
        <img src={NavLogo} alt="" className="width-2rem me-2"/>
        <span className="d-none d-md-block">the<span className="fw-bold">SocialSpot</span></span>
      </a>
      <div className="justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav d-flex flex-row align-items-center">
              <li className="nav-item me-4">
                  <form action="" className="m-0 p-0 d-flex align-items-center w-100">
                      <input type="text" className="form-control form-control-sm" placeholder="Search users ..."/>
                      {/* <button className="bg-transparent border-0" type="button">
                          <img src={SearchIcon} alt="" className="width-1-5rem"/>
                      </button> */}
                  </form>
              </li>
              <li className="nav-item dropdown me-4">
                  <img src={NotificationIcon} className="width-1-5rem" role="button" data-bs-toggle="modal" data-bs-target="#notifications"/>
                  <div className="modal fade" id="notifications" tabIndex={-1} aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5">Notifications</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <a className="dropdown-item d-flex justify-content-between align-items-center" href="#">
                            <div className="d-flex align-items-center">
                              <img src="" alt="" className="width-2rem rounded-circle me-3"/>    
                              <p className="m-0">alaeherrak liked your post</p>
                            </div>
                            <img src="./poste.jpg" alt="" className="width-2rem"/>
                          </a>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-primary">All notifications</button>
                        </div>
                      </div>
                    </div>
                  </div>
              </li>
              <li className="nav-item dropdown">
                  <img src={user?.profilePicture} className="width-2rem p-0 rounded-circle" role="button" data-bs-toggle="modal" data-bs-target="#profile"/>
                  <div className="modal fade" id="profile" tabIndex={-1} aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5">alaeherrak</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <a href="" className="text-decoration-none text-body nav-link d-flex align-items-center"><img src="./user-dark.png" className="width-1-5rem me-2"/>Profile</a>
                          <a href="" className="text-decoration-none text-body nav-link d-flex align-items-center"><img src="./theme-dark.png" className="width-1-5rem me-2"/>Theme</a>
                          <a href="" className="text-decoration-none text-body nav-link d-flex align-items-center"><img src="./settings-dark.png" className="width-1-5rem me-2"/>Settings</a>
                          <a href="" className="text-decoration-none text-body nav-link d-flex align-items-center"><img src="./logout-dark.png" className="width-1-5rem me-2"/>Logout</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
          </ul>
      </div>
    </div>
  </nav>);
};

export default Navbar;
