import { SettingsThemeProps } from "../../types";

const Password = ({ theme }:SettingsThemeProps) => {
  return (
    <div className={`bg-${theme==='dark'?"dark":"white"} p-4 p-md-5 rounded-3 shadow-sm mb-3`}>
      <h5>Update Password</h5>
      <p className="mb-4">
        Ensure your account is using a long, random password to stay secure.
      </p>
      <form>
        <label htmlFor="currentPassword" className="form-label fw-medium">
          Current Password
        </label>
        <input
          type="password"
          className="form-control mb-3"
          id="currentPassword"
        />

        <label htmlFor="newPassword" className="form-label fw-medium">
          New Password
        </label>
        <input type="password" className="form-control mb-3" id="newPassword" />

        <label htmlFor="confirmPassword" className="form-label fw-medium">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control mb-3"
          id="confirmPassword"
        />

        <p className="text-danger opacity-0">.</p>

        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    </div>
  );
};

export default Password;
