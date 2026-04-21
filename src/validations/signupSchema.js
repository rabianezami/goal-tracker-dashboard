import * as yup from "yup";

export const signupSchema = (t) =>  
    yup.object({
        name: yup
            .string()
            .trim()
            .required(t("validation.nameRequired"))
            .min(2, t("validation.nameMin")),

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
            ),

        confirmPassword: yup
            .string()
            .trim()
            .required(t("validation.confirmPasswordRequired"))
            .oneOf([yup.ref('password'), null], t("validation.passwordMatch"))
    }
);