import { Link } from "react-router-dom";
import "./home.css"

export const NotAllowed = () => {
  return (
    <div className="border pado">
      <div className="card wita">
        <h4 className="text-center moba">
          <hr />
          You are not allowed to view this page!
          <hr />
          <>
            <Link className="rd-text" to="/login">
              Do you have an account? Please log in!
            </Link>
          </>
          <hr />
          <>
            <Link className="rd-text" to="/signup">
              You don't have an account? Please signup!
            </Link>
          </>
          <hr />
        </h4>
      </div>
    </div>
  );
}
