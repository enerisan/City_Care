import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import axios from "axios";

export default function Menu({ currentUser, setCurrentUser }) {
  const [showLinks, setShowLinks] = useState(false);
  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3310/api/auth/logout", {
        withCredentials: true, // enable credentials here to allow express to read cookies
      });

      setShowLinks(false);

      setCurrentUser(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={`menu ${showLinks ? "active" : "inactive"} `}>
      <ul className="navbarList">
        <li className="navbarItem">
          <NavLink
            to={currentUser ? `/board/${currentUser.id}` : "/"}
            className="navbarLink"
            onClick={handleShowLinks}
          >
            Mon compte
          </NavLink>
        </li>
        <li className="navbarItem">
          <NavLink to="/" className="navbarLink" onClick={handleShowLinks}>
            Mes signalements
          </NavLink>
        </li>
        <li className="navbarItem">
          <NavLink
            to="/ajout-incident"
            className="navbarLink"
            onClick={handleShowLinks}
          >
            Signaler un incident
          </NavLink>
        </li>

        <li className="navbarItem">
          {currentUser ? (
            <button type="button" className="navbarLink" onClick={handleLogout}>
              Déconexion
            </button>
          ) : (
            <NavLink to="/" className="navbarLink" onClick={handleShowLinks}>
              Connexion
            </NavLink>
          )}
        </li>
      </ul>
      <button
        className="burgerMenu"
        aria-label="burger"
        type="button"
        onClick={handleShowLinks}
      >
        <span className="burgerLine" />
      </button>
    </div>
  );
}

Menu.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  setCurrentUser: PropTypes.func,
};

Menu.defaultProps = {
  currentUser: null,
  setCurrentUser: () => {},
};
