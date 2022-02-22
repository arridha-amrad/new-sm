import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import useForm from "../../utils/useForm";
import { createPostAction } from "./postSlice";

const PostMaker = () => {
  const dispatch = useAppDispatch();
  const { onChange, state } = useForm({
    body: "",
  });
  const [fileObj2, setFileObj2] = useState<FileList | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  const uploadMultipleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const fileArray: string[] = [];
    const fileObj: FileList[] = [];
    const files = e.target.files;
    console.log("files : ", files);

    if (files) {
      setFileObj2(files);
      fileObj.push(files);
      console.log("fileObj : ", fileObj);

      for (let i = 0; i < fileObj[0].length; i++) {
        const obj = URL.createObjectURL(fileObj[0][i]);
        fileArray.push(obj);
      }
      setImages(fileArray);
    }
  };

  const createPost = () => {
    const formData = new FormData();
    formData.append("body", state.body);
    for (let i = 0; i < fileObj2!.length; i++) {
      const file = fileObj2![i];
      formData.append("images", file);
    }
    dispatch(createPostAction(formData));
  };

  return (
    <div className="flex-grow-1 p-2">
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

        <div className="d-flex align-items-center">
          {images.length > 0 &&
            images.map((image, index) => (
              <img
                key={index}
                style={{ width: "200px", height: "200px" }}
                className="img-thumbnail"
                src={image}
                alt="preview"
              />
            ))}
        </div>

        <input
          ref={ref}
          multiple
          type="file"
          hidden
          name="images"
          onChange={uploadMultipleFiles}
        />
        <div className="d-flex gap-2 justify-content-between align-items-center ">
          <div className="d-flex gap-2 align-items-center">
            <button
              onClick={createPost}
              type="submit"
              className="btn btn-primary"
            >
              Post
            </button>
            <div>{state.body.length}/200</div>
          </div>

          <button
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
