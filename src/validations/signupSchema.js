import * as yup from "yup";
import i18next from "i18next";

export const registerSchema = yup.object().shape({
    name: yup.string()
        .trim()
        .required(i18next.t("register.validation.nameRequired"))
        .min(2, i18next.t("register.validation.nameMin")),

    email: yup.string()
        .trim()
        .required(i18next.t("register.validation.emailRequired"))
        .email(i18next.t("register.validation.invalidEmail")),

    password: yup.string()
        .trim()
        .required(i18next.t("register.validation.passwordRequired"))
        .min(6, i18next.t("register.validation.passwordMin"))
        .matches(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        i18next.t("register.validation.passwordFormat")
        ),

    confirmPassword: yup.string()
        .trim()
        .required(i18next.t("register.validation.confirmPasswordRequired"))
        .oneOf([yup.ref('password'), null], i18next.t("register.validation.passwordMatch"))
});