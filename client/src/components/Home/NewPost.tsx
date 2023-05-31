import { useEffect, useState } from "react";

import { UploadImage } from "../../assets/images";
import { PostToCreate, UserThemeUpdateFeedProps } from "../../types";
import { createPost } from "../../api/post";

const NewPost = ({ user, theme, setPosts }: UserThemeUpdateFeedProps) => {
  const [textContent, setTextContent] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [postable, setPostable] = useState<boolean>(false);

  useEffect(() => {
    setPostable(textContent === "" && photo === "" ? false : true);
  }, [textContent, photo]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setPhoto(reader.result as string);
        };
      } else {
        setPostable(false);
        alert("Please select an image file");
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postable) return;
    const post: PostToCreate = {
      user_id: user.user_id!,
      textContent,
      photo,
      date: new Date(),
      edited: false,
    };
    createPost(post)
      .then((res) => {
        setPosts((prev) => [res.data, ...prev]);
        setTextContent("");
        setPhoto("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={`col-12 col-lg-3 p-3 bg-${
        theme === "dark" ? "dark" : "light"
      } rounded-2 border border-1 border-dark-subtle h-100 mb-3`}
    >
      <form className="w-100" onSubmit={handleFormSubmit}>
        <textarea
          className="form-control mb-3"
          rows={1}
          onFocus={(e) => e.target.setAttribute("rows", "3")}
          onBlur={(e) => e.target.setAttribute("rows", "1")}
          placeholder="What's on your mind?"
          value={textContent}
          onChange={(e) => {
            setTextContent(e.target.value);
          }}
        ></textarea>
        <div className="d-flex justify-content-between align-items-center">
          <label htmlFor="photo">
            <img
              src={photo || UploadImage}
              style={{ cursor: "pointer", maxWidth: "64px" }}
              alt="upload image"
            />
          </label>
          {photo !== "" && (
            <button
              type="button"
              className="btn btn-outline-danger me-auto ms-2"
              onClick={() => {
                setPhoto("");
                (document.getElementById("photo") as HTMLInputElement).value =
                  "";
              }}
            >
              x
            </button>
          )}
          <input
            type="file"
            className="d-none"
            id="photo"
            accept="image/*"
            onChange={handleFileInputChange}
          />
          <div>
            <button
              type="reset"
              onClick={() => {
                setTextContent("");
                setPhoto("");
              }}
              className="btn btn-secondary me-1"
              disabled={postable ? false : true}
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={postable ? false : true}
              className="btn btn-primary"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
