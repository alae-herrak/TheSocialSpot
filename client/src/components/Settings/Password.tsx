import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { UserThemeProps, User } from "../../types";
import {
  isPasswordCorrect,
  isPasswordEmpty,
  updatePassword,
} from "../../api/user";
import { update } from "../../redux/userSlice";

const Password = ({ user, theme }: UserThemeProps) => {
  const dispatch = useDispatch();

  const [firstPassword, setFirstPassword] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>(".");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    isPasswordEmpty(user?.password!).then((res) => setFirstPassword(res.data));
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (firstPassword) {
      if (newPassword.trim() === "" || confirmPassword.trim() === "")
        setErrorMessage("Password can't be empty");
      else {
        if (newPassword !== confirmPassword)
          setErrorMessage("Passwords don't match");
        else {
          setLoading(true);
          updatePassword(newPassword).then((res) => {
            setLoading(false);
            dispatch(update(JSON.stringify(res.data)));
            showAlertTimout();
            setFirstPassword(false);
            setNewPassword("");
            setConfirmPassword("");
            setErrorMessage(".");
          });
        }
      }
    } else {
      if (
        currentPassword.trim() === "" ||
        newPassword.trim() === "" ||
        confirmPassword.trim() === ""
      )
        setErrorMessage("Password can't be empty");
      else {
        if (newPassword !== confirmPassword)
          setErrorMessage("Passwords don't match");
        else {
          const localUser: User = JSON.parse(localStorage.getItem("user")!);
          setLoading(true);
          isPasswordCorrect(currentPassword, localUser.password).then((res) => {
            if (!res.data) {
              setErrorMessage("Current password is incorrect");
              setLoading(false);
            } else {
              updatePassword(newPassword).then((res) => {
                setLoading(false);
                dispatch(update(JSON.stringify(res.data)));
                showAlertTimout();
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setErrorMessage(".");
              });
            }
          });
        }
      }
    }
  };

  const showAlertTimout = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div
      className={`bg-${
        theme === "dark" ? "dark" : "white"
      } p-4 p-md-5 rounded-3 shadow-sm mb-3`}
    >
      {showAlert && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          Password has been changed
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <h5>Update Password</h5>
      <p className="mb-4">
        Ensure your account is using a long, random password to stay secure.
      </p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="currentPassword" className="form-label fw-medium">
          Current Password
        </label>
        <input
          type="password"
          className="form-control mb-3"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          disabled={firstPassword}
        />

        <label htmlFor="newPassword" className="form-label fw-medium">
          New Password
        </label>
        <input
          type="password"
          className="form-control mb-3"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <label htmlFor="confirmPassword" className="form-label fw-medium">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control mb-3"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <p
          className={`text-danger mt-3 ${
            errorMessage === "." ? "opacity-0" : ""
          }`}
        >
          {errorMessage}
        </p>
        <button type="submit" className="btn btn-primary settings-btn">
          {loading ? (
            <div className="spinner-border spinner-border-sm"></div>
          ) : (
            "Save"
          )}
        </button>
      </form>
    </div>
  );
};

export default Password;
