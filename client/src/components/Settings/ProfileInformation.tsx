import { useState } from "react";
import { ProfileInformationProps } from "../../types";

const ProfileInformation = ({ user, theme }: ProfileInformationProps) => {
  const [fullName, setFullName] = useState<string>(user?.fullName!);
  const [email, setEmail] = useState<string>(user?.email!);

  return (
    <div
      className={`bg-${
        theme === "dark" ? "dark" : "white"
      } p-4 p-md-5 rounded-3 shadow-sm mb-3`}
    >
      <h5>Profile information</h5>
      <p className="mb-4">
        Update your account's profile information and email address.
      </p>
      <form>
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

        <p className="text-danger opacity-0">.</p>

        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    </div>
  );
};

export default ProfileInformation;
