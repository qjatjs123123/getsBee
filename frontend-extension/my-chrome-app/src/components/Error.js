import "./Content.css"

function Error({errorMessage}) {
  return (
    <div className="error-container">
      <div className="error-message"> {errorMessage} </div>{" "}
    </div>
  );
}

export default Error;
