import { Container } from "react-bootstrap";
import AdminNav from "./AdminNav";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserById } from "../../features/user/userSlice";

function UserDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  if (!currentUser) return <div>No User found</div>;

  return (
    <Container fluid>
      <AdminNav />
      <Link to={-1} className="back">
        <i className="bi bi-arrow-left" />
      </Link>
      <p>
        <strong>User Name: </strong>
        {currentUser.name}
      </p>
      <p>
        <strong>User ID: </strong>
        {currentUser._id}
      </p>
      <p>
        <strong>User Email: </strong>
        {currentUser.email}
      </p>
      <p>
        <strong>User Phone Number: </strong>
        {currentUser.phone}
      </p>
      <p>
        <strong>User Admin Status: </strong>
        {currentUser.isAdmin ? "Yes" : "No"}
      </p>
    </Container>
  );
}

export default UserDetails;
