import { Link } from "react-router-dom";

export const GoBack = () => {
  return (
    <Link to={-1} className="back">
      <i className="bi bi-arrow-left" />
    </Link>
  );
};
