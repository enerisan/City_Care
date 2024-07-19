/* eslint-disable camelcase */

import "./BoardPage.css";

import axios from "axios";
import { useEffect } from "react";
import {
  useLoaderData,
  useOutletContext,
  useNavigate,
  NavLink,
} from "react-router-dom";

export default function BoardPage() {
  const navigate = useNavigate();
  const { currentUser } = useOutletContext();
  const user = useLoaderData();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/checkauth`,
          {
            withCredentials: true,
          }
        );
        const authenticatedUser = response.data.user;
        if (!authenticatedUser || authenticatedUser.id !== currentUser.id) {
          navigate("/");
        }
      } catch (e) {
        console.error(e);
        navigate("/");
      }
    };

    checkAuth();
  }, [currentUser, navigate]);

  if (!currentUser) {
    return navigate("/");
  }

  const { firstname, lastname, identity_card, email } = user.user;
  const incidents = user.incident;

  return (
    <div className="board-body">
      <div className="board-container">
        <h1 className="board-titre">MES INFORMATIONS</h1>
        <div className="card-infos">
          <img src="/images/city (3).png" alt="avatar" className="img-avatar" />
          <div className="infos-user">
            <div className="nom-email">
              <p>
                {" "}
                {firstname} {lastname}
              </p>
              <p>{email}</p>
            </div>
            <div className="pass-password">
              <p>Passport : {identity_card}</p>
              <p>**********</p>
            </div>
          </div>

          <button type="submit" className="modifier-btn">
            MODIFIER
          </button>
        </div>
        <h1 className="board-titre">MES SIGNALEMENTS</h1>
        {incidents.map((incident) => (
          <div className="card-signalement" key={incident.incident_id}>
            <img className="img-incident" src={incident.image} alt="incident" />
            <div className="infos-incident">
              <p className="incident-title">{incident.title}</p>
              <p>{incident.address}</p>
              <p>{incident.date}</p>
              <p>{incident.description}</p>
            </div>
            <div className="status">
              {incident.status_id === 3 && "🟡 RÉSOLU"}
              {incident.status_id === 2 && "⚪ EN COURS"}
              {incident.status_id === 1 && "⚪ ENVOYÉ"}
            </div>
          </div>
        ))}
      </div>

      <NavLink to="/ajout-incident" className="signalement-btn">
        Signaler un incident
      </NavLink>
    </div>
  );
}
