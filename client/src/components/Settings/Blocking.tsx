import { useEffect, useState } from "react";

import { UserThemeProps, User } from "../../types";
import {
  createRelation,
  deleteRelation,
  getBlockingsOfUserId,
  getRelationOfTwoUserIds,
  updateRelation,
} from "../../api/relation";
import { getUserByEmail, getUserById } from "../../api/user";

const Password = ({ user, theme }: UserThemeProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [blockedUsers, setBlockedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getBlockingsOfUserId().then((res) => {
      if (res.data) {
        res.data.map((relation) => {
          getUserById(relation.user_id2).then((res) => {
            setBlockedUsers((prev) => [...prev, res.data]);
          });
        });
        setLoading(false);
      }
    });
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() === "") setErrorMessage("Please enter a valid email");
    else {
      getUserByEmail(email).then((res) => {
        if (!res.data)
          setErrorMessage("No user was found with the specified email");
        else {
          const toBeBlocked = res.data.user;
          const confirmation = confirm(
            `Are you sure you want to block "${toBeBlocked.email}"?`
          );
          if (!confirmation) return;
          getRelationOfTwoUserIds(user.user_id!, toBeBlocked.user_id!).then(
            (res) => {
              if (!res.data) {
                createRelation({
                  relation_id: undefined,
                  user_id1: user.user_id!,
                  user_id2: toBeBlocked.user_id!,
                  state: "blocked",
                });
              } else {
                updateRelation(res.data.relation_id!, "blocked");
              }
              setEmail("");
              setBlockedUsers([...blockedUsers, toBeBlocked]);
            }
          );
        }
      });
    }
  };

  const handleUnblock = (user_id: number) => {
    getRelationOfTwoUserIds(user.user_id!, user_id).then((res) => {
      deleteRelation(res.data.relation_id!).then(() => {
        setBlockedUsers((blockedUsers) =>
          blockedUsers.filter((u) => u.user_id !== user_id)
        );
      });
    });
  };

  return (
    <div
      className={`bg-${
        theme === "dark" ? "dark" : "white"
      } p-4 p-md-5 rounded-3 shadow-sm mb-3`}
    >
      <h5>Blocking</h5>
      <p className="mb-4 d-lg-none">
        Once you block someone, that person can no longer see things you post on
        your timeline, or add you as a friend.
      </p>
      <p className="mb-4 w-50 d-none d-lg-block">
        Once you block someone, that person can no longer see things you post on
        your timeline, or add you as a friend.
      </p>
      <div>
        <form className="d-flex flex-column gap-2" onSubmit={handleFormSubmit}>
          <div className="d-flex gap-2">
            <input
              type="email"
              className="form-control"
              placeholder="Type the complete email of the person"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Block
            </button>
          </div>
          <p
            className={`text-danger mt-3 ${
              errorMessage === "" ? "opacity-0" : ""
            }`}
          >
            {errorMessage}
          </p>
        </form>
      </div>
      <div>
        {blockedUsers.length? <p className="fw-bold">Blocked users</p>:''}
        {loading && <div className="spinner-border"></div>}
        <table className="table settings-table">
          <tbody>
            {blockedUsers.map((u) => (
              <tr key={u.user_id}>
                <td className="d-flex justify-content-between align-items-center">
                  {u.email}
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleUnblock(u.user_id!)}
                  >
                    Unblock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Password;
