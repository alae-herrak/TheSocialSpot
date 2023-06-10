import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createRelation,
  deleteRelation,
  getRelationOfTwoUserIds,
  updateRelation,
} from "../../api/relation";
import { ActionButtonProps, Relation } from "../../types";
import { InfoLight, InfoDark } from "../../assets/images";
import { createNotification, deleteNotification } from "../../api/notification";

const ActionButton: React.FC<ActionButtonProps> = ({
  user_id1,
  user_id2,
  setIsFriend,
  theme,
}) => {
  const navigate = useNavigate();

  const [action, setAction] = useState<string>("");
  const [relationId, setRelationId] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);

  const location = window.location.pathname.substring(0, 5);

  getRelationOfTwoUserIds(user_id1, user_id2)
    .then((res) => {
      if (!res.data) setAction("Add friend");
      else {
        setRelationId(res.data.relation_id);
        if (res.data.state === "friends") {
          if (location === "/user") setAction("Remove friend");
          else setAction("View profile");
        }
        if (res.data.state === "blocked") setAction("Blocked");
        if (res.data.state === "invite") {
          setAction(
            res.data.user_id1 === user_id1
              ? "Cancel request"
              : "Confirm request"
          );
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (action === "View profile") {
      navigate(`/user/${user_id2}`);
    }
    if (action === "Add friend") {
      setLoading(true);
      const relation: Relation = {
        relation_id: undefined,
        user_id1,
        user_id2,
        state: "invite",
      };
      createRelation(relation)
        .then((res) => {
          if (res.data) {
            setAction("Cancel request");
            setLoading(false);
            createNotification({
              notification_id: undefined,
              event: "invite",
              user_id1,
              user_id2,
              ressource_id: res.data.relation_id!,
              opened: false,
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          alert("There has been an error");
        });
    }
    if (action === "Confirm request") {
      setLoading(true);
      updateRelation(relationId!, "friends")
        .then((res) => {
          if (res.data) {
            setAction("View profile");
            setLoading(false);
            setIsFriend && setIsFriend(true);
            createNotification({
              notification_id: undefined,
              event: "inviteAccepted",
              user_id1,
              user_id2,
              ressource_id: res.data.relation_id!,
              opened: false,
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          alert("There has been an error");
        });
    }
    if (action === "Cancel request") {
      setLoading(true);
      deleteRelation(relationId!)
        .then((res) => {
          if (res.data) {
            setAction("Add friend");
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          alert("There has been an error");
        });
      deleteNotification("invite", user_id1, user_id2, relationId!);
    }
  };

  confirmation &&
    deleteRelation(relationId!)
      .then((res) => {
        if (res.data) {
          setAction("Add friend");
          setLoading(false);
          setIsFriend && setIsFriend(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert("There has been an error");
      });

  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    // @ts-ignore
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  const btnProps =
    action === "Remove friend"
      ? {
          "data-bs-toggle": "modal",
          "data-bs-target": "#confirmationModal",
        }
      : {};

  return (
    <>
      <div className="d-flex align-items-center gap-2">
        <button
          onClick={handleButtonClick}
          disabled={action === "Blocked" ? true : false}
          {...btnProps}
          className={`btn btn-${
            action === "View profile"
              ? "primary"
              : action === "Blocked"
              ? "danger"
              : "secondary"
          } btn-sm d-flex align-items-center gap-2`}
        >
          <span>{action}</span>
          {loading && <div className="spinner-border spinner-border-sm"></div>}
        </button>
        {action === "Blocked" && location === "/user" && (
          <i
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-title="You can block or unblock users from the settings page"
          >
            <img
              src={theme === "dark" ? InfoLight : InfoDark}
              className="width-1-5rem"
            />
          </i>
        )}
      </div>
      <div
        className="modal fade"
        id="confirmationModal"
        tabIndex={-1}
        aria-labelledby="confirmationModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Confirm your choice
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Remove this person from friend list?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  setConfirmation(true);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionButton;
