/* eslint-disable react/jsx-props-no-spreading  */

import axios from "axios";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./HomePage.css";

export default function HomePage() {
  const { setCurrentUser } = useOutletContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3310/api/auth/login",
        data,
        {
          withCredentials: true,
        }
      );
      setCurrentUser(response.data.user);

      navigate(`/board/${response.data.user.id}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="body-home">
      <img src="/images/city.png" alt="logo-site" className="logo-care" />
      <h1 className="home-titre">
        Appli citoyenne pour signaler les incidents dans ta ville
      </h1>

      <div className="connection-container">
        <form
          className="form-connection"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            name="email"
            {...register("email", {
              required: "L'email est obligatoire",
              pattern: {
                value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                message: "Le format de l'e-mail est incorrect.",
              },
            })}
          />

          {errors.email && <span> {errors.email.message}</span>}

          <input
            className="input-field"
            type="password"
            placeholder="Mot de passe"
            name="password"
            {...register("password", {
              required: "Le mot de passe est obligatoire",
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,64}$/,
                message:
                  "Le mot de passe doit au moins contenir 1 majuscule, 1 caractère spécial et 1 chiffre",
              },
            })}
          />

          {errors.password && <span> {errors.password.message}</span>}

          <button className="fleche-btn" type="submit">
            <img className="fleche-img" src="/images/fleche.png" alt="fleche" />
          </button>
        </form>
        <h2 className="home-subtitle">
          Pas de compte ?
          <Link to="/inscription" className="inscrivez-vous">
            Inscrivez-vous
          </Link>
        </h2>
      </div>
    </div>
  );
}
