import "./SignUpPage.css";
/* eslint-disable react/jsx-props-no-spreading  */

import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function SignPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = { ...data };
    delete formData.confirmpassword;
    reset();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/user`, data);
      toast.success("Votre inscription a été validée");
      navigate("/");
    } catch (e) {
      console.error(e.response.data);
      toast.error("Une erreur es survenue, veuillez réessayer ultérieurement");
    }
  };

  return (
    <div className="inscription-body">
      <img
        src="../../../public/images/city (3).png"
        alt="avatar"
        className="avatar"
      />
      <h1 className="inscription-titre">JE CRÉE MON COMPTE</h1>

      <form className="form-sign" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-field"
          name="firstname"
          type="text"
          placeholder="Prénom"
          {...register("firstname", {
            minLength: 2,
            required: "required",
          })}
        />

        <input
          className="input-field"
          name="lastname"
          type="text"
          placeholder="Nom"
          {...register("lastname", {
            minLength: 2,
            required: "required",
          })}
        />

        <input
          className="input-field"
          name="identity_card"
          type="text"
          placeholder="CNI/Passeport"
          {...register("identity_card", {
            required: "required",
          })}
        />
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          name="email"
          {...register("email", {
            required: "L'e-mail est obligatoire",
            pattern: {
              value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
              message: "Le format de votre e-mail est incorrect",
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
                /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,200}$/,
              message:
                "Le mot de passe doit au moins contenir 1 majuscule, 1 caractère spécial et 1 chiffre",
            },
          })}
        />
        {errors.password && <span> {errors.password.message}</span>}

        <input
          className="input-field"
          name="confirmpassword"
          type="password"
          placeholder="Confirmation mot de passe"
          {...register("confirmpassword", {
            pattern:
              /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,200}$/,
            required: "required",
            validate: (value) =>
              value === watch("password") ||
              "Les mots de passe ne correspondent pas",
          })}
        />

        <button className="btn-sign" type="submit">
          JE VALIDE
        </button>
      </form>
    </div>
  );
}
