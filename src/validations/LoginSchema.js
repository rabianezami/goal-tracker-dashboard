import * as yup from "yup";

export const loginSchema = (t) =>
  yup.object({
    email: yup
      .string()
      .trim()
      .required(t("validation.emailRequired"))
      .email(t("validation.invalidEmail")),

    password: yup
      .string()
      .trim()
      .required(t("validation.passwordRequired"))
      .min(6, t("validation.passwordMin"))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        t("validation.passwordFormat")
      )
});