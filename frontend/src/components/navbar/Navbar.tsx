import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./navbar.scss";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar">
      <div className="logo">
        <span>Analytics Dashboard</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <div className="user">
          <img
            src={user?.image}
            alt=""
          />
          <span>{user?.email}</span>
        </div>
        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
