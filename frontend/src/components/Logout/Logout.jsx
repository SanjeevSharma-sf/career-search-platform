import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { logout } from "../../redux/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("user"));

  const handleClick = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {token && (
        <Button>
          <Link
            to="/"
            style={{ color: "white", textDecoration: "none" }}
            onClick={handleClick}
          >
            Logout
          </Link>
        </Button>
      )}
    </>
  );
};

export default Logout;
