import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createRelation,
  deleteRelation,
  getRelationOfTwoUserIds,
  updateRelation,
} from "../../api/relation";
import { ActionButtonProps, Relation } from "../../types";

const ActionButton: React.FC<ActionButtonProps> = ({ user_id1, user_id2 }) => {
  const navigate = useNavigate();

  const [action, setAction] = useState<string>("");
  const [relationId, setRelationId] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  getRelationOfTwoUserIds(user_id1, user_id2)
    .then((res) => {
      if (!res.data) setAction("Add friend");
      else {
        setRelationId(res.data.relation_id);
        if (res.data.state === "friends") {
          if (window.location.pathname.substring(0, 5) === "/user")
            setAction("Remove friend");
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
    }
    if (action === "Remove friend") {
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
    }
    if (action === "Blocked") {
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      disabled={action === "Blocked" ? true : false}
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
  );
};

export default ActionButton;