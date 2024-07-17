const { z } = require("zod");

/* eslint-disable camelcase */
const passwordRegex =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,200}$/;

const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

const userSchema = z.object({
  firstname: z
    .string({
      invalid_type_error: "Le format de votre prénom n’est pas valide",
    })
    .min(2, {
      message: "votre prénom doit contenir au minimum 2 caractères",
    })
    .max(20, {
      message: "votre prénom doit contenir au maximum 20 caractères",
    }),
  lastname: z
    .string({
      invalid_type_error: "Le nom de votre format n’est pas valide",
    })
    .min(2, {
      message: "Votre nom doit contenir au minimum 2 caractères",
    })
    .max(20, {
      message: "Votre nom doit contenir au maximum 20 caractères",
    }),

  identity_card: z
    .string({
      invalid_type_error: "Le format de votre CNI/passport n’est pas valide",
    })
    .min(7, {
      message: "Votre cni/passport doit contenir au minimum 7 caractères",
    }),

  email: z.string().regex(emailRegex, {
    message: "votre email n'a pas le bon format",
  }),
  password: z
    .string()
    .regex(passwordRegex, {
      message:
        "Votre mot de passe doit contenir, un chiffre, une lettre majuscule et un caractère spécial",
    })
    .min(8, {
      message: "Votre nom doit contenir au minimum 8 caractères",
    }),
});

const validateUserSchema = (req, res, next) => {
  const { firstname, lastname, password, identity_card, email } = req.body;

  const validate = userSchema.safeParse({
    firstname,
    lastname,
    identity_card,
    email,
    password,
  });

  if (!validate.success) {
    const errors = validate.error.issues.reduce((acc, issue) => {
      acc[issue.path[0]] = issue.message;
      return acc;
    }, {});

    return res.status(403).json(errors);
  }
  return next();
};

module.exports = validateUserSchema;
