import * as yup from "yup";

export const loginSchema = () =>
  yup.object({
    email: yup
      .string()
      .trim()
      .required(i18next.t("login.validation.emailRequired"))
      .email(i18next.t("login.validation.invalidEmail")),

    password: yup
      .string()
      .trim()
      .required(i18next.t("login.validation.passwordRequired"))
      .min(6, i18next.t("login.validation.passwordMin"))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        i18next.t("login.validation.passwordFormat")
      )
});