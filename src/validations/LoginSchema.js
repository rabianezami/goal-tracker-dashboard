import * as yup from "yup";

export const loginSchema = (t) =>
  yup.object({
    email: yup
      .string()
      .trim()
      .required(t("login.validation.emailRequired"))
      .email(t("login.validation.invalidEmail")),

    password: yup
      .string()
      .trim()
      .required(t("login.validation.passwordRequired"))
      .min(6, t("login.validation.passwordMin"))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        t("login.validation.passwordFormat")
      )
});