import { useState } from "react";
import { useDispatch } from "react-redux";

import { ProfileInformationProps } from "../../types";
import {
  getUserByEmail,
  updateEmail,
  updateFullName,
  updateProfilePicture,
} from "../../api/user";
import { update } from "../../redux/userSlice";

const ProfileInformation = ({ user, theme }: ProfileInformationProps) => {
  const dispatch = useDispatch();
  const noProfilePicture = import.meta.env.VITE_NO_PROFILE_PICTURE;

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(".");
  const [fullName, setFullName] = useState<string>(user!.fullName!);
  const [email, setEmail] = useState<string>(user!.email!);
  const [profilePicture, setProfilePicture] = useState<string>(
    user?.profilePicture!
  );

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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fullName.trim() === "" || email.trim() === "")
      setErrorMessage("Invalid information");
    else {
      if (
        fullName === user.fullName &&
        email === user.email &&
        profilePicture === user.profilePicture
      )
        setErrorMessage("There has been no change");
      else {
        if (fullName !== user.fullName) {
          updateFullName(fullName).then((res) => {
            dispatch(update(JSON.stringify(res.data)));
            showAlertTimout();
          });
          setFullName(fullName);
        }
        if (email !== user.email) {
          getUserByEmail(email).then((res) => {
            if (res.data) setErrorMessage("Email is already taken");
            else
              updateEmail(email).then((res) => {
                dispatch(update(JSON.stringify(res.data)));
                showAlertTimout();
              });
          });
        }
        if (profilePicture !== user.profilePicture)
          updateProfilePicture(profilePicture).then((res) => {
            dispatch(update(JSON.stringify(res.data)));
            showAlertTimout();
          });
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
          Changes have been saved
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <h5>Profile information</h5>
      <p className="mb-4">
        Update your account's profile information and email address.
      </p>
      <form className="settings-form" onSubmit={handleFormSubmit}>
        <label htmlFor="fullname" className="form-label fw-medium">
          Full Name
        </label>
        <input
          type="text"
          className="form-control mb-3"
          id="fullname"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label htmlFor="email" className="form-label fw-medium">
          Email
        </label>
        <input
          type="email"
          className="form-control mb-3"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="profilePicture" className="form-label fw-medium">
          Profile Picture
        </label>
        <div>
          <img
            src={profilePicture}
            alt=""
            width="64px"
            className="img-fluid rounded-circle me-3"
          />
          <label
            htmlFor="file"
            className={`btn btn-outline-${
              theme === "dark" ? "secondary" : "dark"
            } p-3 me-3`}
          >
            Change Profile Picture
          </label>
          <button
            type="button"
            className={`btn btn-outline-danger p-3`}
            onClick={() => setProfilePicture(noProfilePicture)}
          >
            X
          </button>
          <input
            type="file"
            className="d-none"
            accept="image/*"
            id="file"
            onChange={handleFileInputChange}
          />
        </div>
        <p
          className={`text-danger mt-3 ${
            errorMessage === "." ? "opacity-0" : ""
          }`}
        >
          {errorMessage}
        </p>

        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    </div>
  );
};

export default ProfileInformation;
