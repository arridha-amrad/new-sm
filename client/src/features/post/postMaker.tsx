import { ChangeEvent, useRef, useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useForm from "../../utils/useForm";
import { createPostAction, selectPostState } from "./postSlice";

const PostMaker = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(selectPostState);

  const { onChange, state } = useForm({
    body: "",
  });

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
      if (files.length > 5) {
        setError("Maximum 5 images allowed");
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

  const createPost = () => {
    const formData = new FormData();
    formData.append("body", state.body);
    if (fileObj2) {
      for (let i = 0; i < fileObj2!.length; i++) {
        const file = fileObj2![i];
        formData.append("images", file);
      }
    }
    dispatch(createPostAction(formData));
  };

  return (
    <div className="mt-2">
      <div className="d-flex flex-column gap-3">
        <textarea
          onChange={onChange}
          name="body"
          value={state.body}
          rows={5}
          style={{ resize: "none" }}
          placeholder="write something ..."
          className="form-control"
        />

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
      </div>
    </div>
  );
};

export default PostMaker;
