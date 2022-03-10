const EmailConfirmation = () => {
  return (
    <section className=" min-vh-100 d-flex flex-column">
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div style={{ width: "600px" }}>
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Well done!</h4>
            <p>
              Aww yeah, you successfully read this important alert message. This
              example text is going to run a bit longer so that you can see how
              spacing within an alert works with this kind of content.
            </p>
            <hr />
            <p className="mb-0">
              Whenever you need to, be sure to use margin utilities to keep
              things nice and tidy.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-grow-0 d-flex align-items-center justify-content-center flex-column my-3">
        <p>
          Created by <span className="fw-bold">Arridha Amrad</span>
        </p>
      </div>
    </section>
  );
};

export default EmailConfirmation;
