import PropTypes from "prop-types";
import Menu from "../Menu/Menu";
import "./Navbar.css";

export default function Navbar({ currentUser, setCurrentUser }) {
  return (
    <div className="navbar-container">
      <Menu currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <img
        src="/images/city.png"
        alt="logo city care"
        className="logo-citycare"
      />
    </div>
  );
}
Navbar.defaultProps = {
  currentUser: null,
  setCurrentUser: null,
};

Navbar.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  setCurrentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};
