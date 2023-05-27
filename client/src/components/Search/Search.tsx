import { Navigate, useParams } from "react-router-dom";
import { User, UserThemeProps } from "../../types";
import { useEffect, useState } from "react";
import { userSearch } from "../../api/user";

const Search: React.FC<UserThemeProps> = ({ user, theme }: UserThemeProps) => {
  const { searchTerm } = useParams<string>();
  const [result, setResult] = useState<User[]>([]);
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    setloading(true);
    userSearch(searchTerm!).then((res) => {
      setResult(res.data);
      setloading(false);
    });
  }, [searchTerm]);

  return (
    <div className="container p-0">
      {!user.user_id && <Navigate to="/login" />}
      {!searchTerm && <Navigate to="/" />}
      <div
        className={`container bg-${
          theme === "dark" ? "dark" : "white"
        } my-2 px-2 px-sm-3 px-md-5 rounded-3 border border-1 border-dark-subtle`}
      >
        {loading ? (
          <div className="d-flex justify-content-center align-items-center p-5">
            <div className="spinner-border"></div>
          </div>
        ) : (
          !result.length && (
            <div className="d-flex justify-content-center align-items-center p-5">
              <p className="lead">There was no results for '{searchTerm}'</p>
            </div>
          )
        )}
        {result.map((user) => (
          <div
            className="d-flex justify-content-between align-items-center px-0 px-md-5 my-3 my-md-5"
            key={user.user_id}
          >
            <div className="d-flex justify-content-start align-items-center gap-2">
              <img
                src={user.profilePicture}
                style={{
                  aspectRatio: "1/1",
                  objectFit: "contain",
                  backgroundColor: theme === "light" ? "white" : "black",
                }}
                alt=""
                className="img-fluid width-4rem rounded-circle me-2 border border-1 border-dark-subtle"
              />
              <div className="d-flex flex-column justify-content-start">
                <p className="lead fw-semibold m-0">{user.fullName}</p>
                <p className="m-0">{user.email}</p>
              </div>
            </div>
            <button className="btn btn-primary btn-sm">View profile</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
