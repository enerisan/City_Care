import "./AjoutIncidentPage.css";
/* eslint-disable react/jsx-props-no-spreading */

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useOutletContext } from "react-router-dom";

const GOOGLE_MAPS_API_KEY = "AIzaSyCxWMTflu26u709AV8Ml3sXjG5XAA-xpsQ";

export default function AjoutIncidentPage() {
  const [useGeolocation, setUseGeolocation] = useState(false);
  const [address, setAddress] = useState("");
  const { currentUser } = useOutletContext();
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    if (useGeolocation && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
            );
            const { results } = response.data;

            if (results.length > 0) {
              setAddress(results[0].formatted_address);
            }
          } catch (err) {
            console.error("Error obtaining address from coordinates", err);
          }
        },
        (error) => {
          console.error("Error obtaining geolocation", error);
        }
      );
    }
  }, [useGeolocation]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const data = { ...formData };

    if (!data.image) {
      data.image = "/images/img-plantilla.png";
    }
    data.user_id = currentUser.id;
    data.status_id = 1;
    data.address = address;

    try {
      await axios.post("http://localhost:3310/api/incident", data);
      toast.success("Votre formulaire a bien été soumis");
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue, veuillez réessayer ultérieurement");
    }
  };

  const handleToggleGeolocation = () => {
    const newToggledState = !toggled;
    setToggled(newToggledState);
    setUseGeolocation(newToggledState);
    if (!newToggledState) {
      setAddress("");
    }
  };

  return (
    <div className="incident-body">
      <h1 className="title-incident">SIGNALEZ UN INCIDENT</h1>

      <form className="container-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-infos-img">
          <div className="input-body">
            <div className="input-container">
              <input
                type="text"
                name="title"
                className="input-field"
                {...register("title", {
                  required: "Ce champ est requis",
                  minLength: {
                    value: 2,
                    message: "Le title doit contenir au minimun 2 caractères",
                  },
                })}
                placeholder="Le titre de votre incident"
              />
              {errors.title && (
                <span className="error-incident">{errors.title.message}</span>
              )}
            </div>

            <div className="toggle-container">
              <label htmlFor="geolocation-toggle" className="toggle-label">
                Utiliser la géolocalisation:
                <div className="btn-tg-container">
                  <button
                    id="geolocation-toggle"
                    type="button"
                    className={`toggle-btn ${toggled ? "toggled" : ""}`}
                    onClick={handleToggleGeolocation}
                    aria-label="Toggle Geolocation"
                  >
                    <div className="thumb" />
                  </button>

                  <span>
                    {toggled
                      ? "Géolocalisation activée"
                      : "Géolocalisation désactivée"}
                  </span>
                </div>
              </label>
            </div>
            <div className="input-container">
              <input
                type="text"
                name="address"
                className="input-field"
                {...register("address", {
                  required: "Ce champ est requis",
                })}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                readOnly={useGeolocation}
                placeholder="Adresse de l'incident"
              />
              {errors.address && (
                <span className="error-incident">{errors.address.message}</span>
              )}
            </div>

            <div className="container-category">
              <select
                className="input-field"
                {...register("category_id", {
                  required: "Ce champ est requis",
                })}
              >
                <option value="" disabled>
                  Catégorie
                </option>
                <option className="option-field" value="1">
                  trottoirs
                </option>
                <option className="option-field" value="2">
                  aire de jeux
                </option>
                <option className="option-field" value="3">
                  arbres et jardin
                </option>
                <option className="option-field" value="4">
                  insectes
                </option>
                <option className="option-field" value="5">
                  animaux
                </option>
                <option className="option-field" value="6">
                  sports
                </option>
                <option className="option-field" value="7">
                  fontaines
                </option>
                <option className="option-field" value="8">
                  propreté
                </option>
                <option className="option-field" value="9">
                  poubelles
                </option>
                <option className="option-field" value="10">
                  chaussée
                </option>
                <option className="option-field" value="11">
                  lampadaires
                </option>
                <option className="option-field" value="12">
                  bâtiments publics
                </option>
                <option className="option-field" value="13">
                  égouts
                </option>
                <option className="option-field" value="14">
                  circulation
                </option>
                <option className="option-field" value="15">
                  autres
                </option>
              </select>
              {errors.category_id && (
                <span className="error-incident">
                  {errors.category_id.message}
                </span>
              )}
            </div>
          </div>
          <div className="container-image">
            <img
              className="image-incident"
              src="/images/img-plantilla.png"
              alt="Ajouter"
            />
          </div>
        </div>
        <div className="description-incident">
          <textarea
            name="description"
            className="input-field"
            {...register("description", {
              required: "Ce champ est requis",
            })}
            placeholder="Description de l'incident"
          />
          {errors.description && (
            <span className="error-incident">{errors.description.message}</span>
          )}

          <button className="button-incident" type="submit">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
