import * as yup from "yup";
import i18next from "i18next";

export const loginSchema = yup.object().shape({
  email: yup.string()
    .trim()
    .required(i18next.t("login.validation.emailRequired"))
    .email(i18next.t("login.validation.invalidEmail")),

  password: yup.string()
    .trim()
    .required(i18next.t("login.validation.passwordRequired"))
    .min(6, i18next.t("login.validation.passwordMin"))
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      i18next.t("login.validation.passwordFormat")
    )
});