import * as yup from "yup";

export const registerSchema = (t) =>  
    yup.object({
        name: yup
            .string()
            .trim()
            .required(t("register.validation.nameRequired"))
            .min(2, t("register.validation.nameMin")),

        email: yup
            .string()
            .trim()
            .required(t("register.validation.emailRequired"))
            .email(i18next.t("register.validation.invalidEmail")),

        password: yup
            .string()
            .trim()
            .required(i18next.t("register.validation.passwordRequired"))
            .min(6, i18next.t("register.validation.passwordMin"))
            .matches(
            /^(?=.*[A-Za-z])(?=.*\d).+$/,
            i18next.t("register.validation.passwordFormat")
            ),

        confirmPassword: yup
            .string()
            .trim()
            .required(i18next.t("register.validation.confirmPasswordRequired"))
            .oneOf([yup.ref('password'), null], i18next.t("register.validation.passwordMatch"))
    }
);