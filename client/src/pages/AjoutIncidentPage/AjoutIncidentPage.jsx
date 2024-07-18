import "./AjoutIncidentPage.css";
/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AjoutIncidentPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userId = 1;
  const onSubmit = async (formData) => {
    const data = { ...formData };

    if (!data.image) {
      data.image = "images/Logo_foodtastics.png";
    }
    data.user_id = userId;

    try {
      await axios.post("http://localhost:3310/api/incident", data);
      toast.success("Votre formulaire a bien été soumis");
    } catch (err) {
      console.error(err);
      toast.error("Une erreur es survenue, veuillez réessayer ultérieurement");
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
              />
              {errors.title && (
                <span className="error-incident">{errors.title.message}</span>
              )}
            </div>
            <div className="input-container">
              <input
                type="text"
                name="street"
                className="input-field"
                {...register("street", {
                  required: "Ce champ est requis",
                  minLength: {
                    value: 2,
                    message:
                      "Le nom de la rue doit contenir au minimun 2 caractères",
                  },
                })}
              />
              {errors.street && (
                <span className="error-incident">{errors.street.message}</span>
              )}
            </div>
            <div className="input-container">
              <input
                type="number"
                name="street_number"
                className="input-field"
                {...register("street_number")}
              />
              {errors.street_number && (
                <span className="error-incident">
                  {errors.street_number.message}
                </span>
              )}
            </div>

            <div className="input-container">
              <input
                type="number"
                name="zip_code"
                className="input-field"
                {...register("zip_code")}
              />
              {errors.zip_code && (
                <span className="error-incident">
                  {errors.zip_code.message}
                </span>
              )}
            </div>
            <div className="input-container">
              <select
                type="text"
                name="category"
                className="input-field"
                {...register("category")}
              />
              {errors.category && (
                <span className="error-incident">
                  {errors.category.message}
                </span>
              )}
            </div>
          </div>
          <div className="container-image">
            <img
              className="img-incident"
              src="../../../public/images/img-plantilla.png"
              alt="Ajouter"
            />

            <input
              type="url"
              name="image"
              className="input-field"
              {...register("image", {
                pattern: {
                  value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                  message: "Veuillez entrer une URL valide",
                },
              })}
            />
            {errors.image && (
              <span className="error-incident">{errors.image.message}</span>
            )}
          </div>
        </div>
        <div className="description-incident">
          <textarea
            name="description"
            className="input-field"
            {...register("description")}
          />
          {errors.description && (
            <span className="error-incident">{errors.description.message}</span>
          )}

          <button className="button-incident" type="submit">
            Enregistrer
          </button>
        </div>
        {/*  <button className="button-incident" type="submit">
          Enregistrer
        </button> */}
      </form>
    </div>
  );
}
