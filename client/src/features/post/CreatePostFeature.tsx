import { ChangeEvent, useRef, useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import useFormHooks from "../../utils/useFormHooks";
import { createPostAction } from "./postSlice";
import "./style.css";

interface PostMakerValidator {
  body?: string;
}

const PostMaker = () => {
  const dispatch = useAppDispatch();

  const checkField = () => {
    let errors: PostMakerValidator = {};
    if (state.body.trim() === "") {
      errors.body = "Body field is required";
    }
    return {
      errors,
      isValid: Object.keys(errors).length <= 0,
    };
  };

  const createPost = async () => {
    const formData = new FormData();
    formData.append("body", state.body);
    if (fileObj2) {
      for (let i = 0; i < fileObj2!.length; i++) {
        const file = fileObj2![i];
        formData.append("images", file);
      }
    }
    const res = await dispatch(createPostAction(formData));
    if (res.meta.requestStatus === "fulfilled") {
      notify("New post created successfully", "success");
    }
  };

  const { onChange, onSubmit, isLoading, state, fieldErrors } = useFormHooks<{
    body: string;
  }>(
    {
      body: "",
    },
    createPost,
    checkField
  );

  const [error, setError] = useState("");
  const [fileObj2, setFileObj2] = useState<FileList | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  const pickImages = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const fileObj: FileList[] = [];
    const fileArray: string[] = [];
    const files = e.target.files;

    if (files) {
      if (files.length > 4) {
        notify("Maximum file is 4", "error");
      } else {
        setFileObj2(files);
        fileObj.push(files);
        for (let i = 0; i < fileObj[0].length; i++) {
          const obj = URL.createObjectURL(fileObj[0][i]);
          fileArray.push(obj);
        }
        setPreviewImages(fileArray);
      }
    }
  };

  const notify = (message: string, type: "success" | "error") => {
    if (type === "error") {
      toast.error(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
    if (type === "success") {
      toast.success(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  return (
    <div className="mt-2 border p-2 rounded">
      <form onSubmit={onSubmit} className="d-flex flex-column gap-3">
        <div className=" d-flex gap-3">
          <textarea
            className="myTextArea d-block flex-grow-1"
            onChange={onChange}
            name="body"
            value={state.body}
            style={{ resize: "none" }}
            placeholder="write something ..."
          />

          <div className="grid-container">
            <div className="grid-item-1">
              <img
                className="img"
                src="https://cdn.statically.io/img/www.qoala.app/f=auto/id/blog/wp-content/uploads/2020/12/Bill-Gates-Profil-Biografi-Fakta-Terkini-2020.jpg"
                alt="post"
              />
            </div>

            <div className="grid-item-2">
              <img
                className="img"
                src="https://static.republika.co.id/uploads/images/inpicture_slide/023536800-1619505033-bill_gates_105203_bigjpg.jpg"
                alt="post"
              />
            </div>
          </div>
        </div>

        <input
          ref={ref}
          multiple
          type="file"
          hidden
          name="images"
          onChange={pickImages}
        />

        <div className="d-flex gap-2 justify-content-between align-items-center ">
          <div className="d-flex gap-2 align-items-center">
            <button
              disabled={isLoading || !state.body}
              onClick={createPost}
              type="submit"
              className="btn btn-primary"
            >
              {isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Post"
              )}
            </button>
            <div>{state.body.length}/200</div>|
            <div className="d-flex align-items-center">
              {previewImages.length > 0 &&
                previewImages.map((image, index) => (
                  <img
                    key={index}
                    style={{
                      objectFit: "fill",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    className="rounded-circle img-thumbnail"
                    src={image}
                    alt="preview"
                  />
                ))}
              <span className="ms-1"> {previewImages.length} / 5</span>
              {error && <span className="text-danger ms-1">{error}</span>}
            </div>
          </div>

          <button
            disabled={isLoading}
            onClick={() => ref.current?.click()}
            className="btn btn-outline-primary"
          >
            upload image
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostMaker;