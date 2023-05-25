import { useDispatch } from "react-redux";

import { deleteAccount } from "../../api/user";
import { UserThemeProps } from "../../types";
import { logout } from "../../redux/userSlice";

const DeleteAccount = ({ user, theme }: UserThemeProps) => {
  const dispatch = useDispatch();

  const handleDeleteAccount = () => {
    const confirmation = confirm(
      "This action is irreversible, you can not get your account back once deleted! Are you sure you want to delete the account?"
    );
    if (confirmation) {
      deleteAccount()
        .then((res) => {
          console.log(res.data)
          dispatch(logout());
          location.reload()
        })
        .catch((err) => {
          alert("There has been an error");
        });
    }
  };
  return (
    <div
      className={`bg-${
        theme === "dark" ? "dark" : "white"
      } p-4 p-md-5 rounded-3 shadow-sm mb-3`}
    >
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

      <button className="btn btn-danger" onClick={handleDeleteAccount}>
        DELETE ACCOUNT
      </button>
    </div>
  );
};

export default DeleteAccount;
