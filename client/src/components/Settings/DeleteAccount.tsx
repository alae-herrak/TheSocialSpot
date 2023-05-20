import { SettingsThemeProps } from "../../types";

const DeleteAccount = ({ theme }:SettingsThemeProps) => {
  return (
    <div className={`bg-${theme==='dark'?"dark":"white"} p-4 p-md-5 rounded-3 shadow-sm mb-3`}>
      <h5>Delete Account</h5>
      <p className="mb-4 d-lg-none">
        Once your account is deleted, all of its resources and data will be
        permanently deleted. Before deleting your account, please download any
        data or information that you wish to retain.
      </p>
      <p className="mb-4 w-50 d-none d-lg-block">
        Once your account is deleted, all of its resources and data will be
        permanently deleted. Before deleting your account, please download any
        data or information that you wish to retain.
      </p>

      <button className="btn btn-danger">DELETE ACCOUNT</button>
    </div>
  );
};

export default DeleteAccount;
