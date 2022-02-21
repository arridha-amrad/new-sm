import { ChangeEventHandler, FC, Fragment, useState } from "react";

interface Props {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const InputPassword: FC<Props> = ({ value, onChange }) => {
  const [isText, setIsText] = useState(false);
  return (
    <Fragment>
      <input
        name="password"
        value={value}
        onChange={onChange}
        className="form-control"
        placeholder="password"
        type={`${isText ? "text" : "password"}`}
      />
      <div style={{ marginTop: "-8px" }} className="form-check form-text">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexCheckDefault"
          onChange={() => setIsText(!isText)}
        />
        <label className="form-check-label">Show Password</label>
      </div>
    </Fragment>
  );
};

export default InputPassword;
