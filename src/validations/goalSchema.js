import * as yup from "yup";
// import { useTranslation } from "react-i18next";

// const {t} = useTranslation("createGoal")

export const goalSchema = (goalTypeOptions, goalCategoryOptions, t) =>

    yup.object({
        title: yup
            .string()
            .trim()
            .required(t("errors.titleRequired"))
            .min(3, t("errors.titleMin"))
            .max(100, t("errors.titleMax"))
        ,
        goalCategory: yup
            .string()
            .nullable()
            .required(t("errors.categoryRequired"))
            .oneOf(
                goalCategoryOptions.map(opt => opt.value), 
                t("errors.invalidCategory")
            ),
        goalType: yup
            .string()
            .nullable()
            .required(t("errors.typeRequired"))
            .oneOf(
                goalTypeOptions.map(opt => opt.value), 
                t("errors.invalidType")
            ),

        target: yup
            .number()
            .typeError(t("errors.setTarget"))
            .positive(t("errors.targetPositive"))
            .required(t("errors.targetRequired"))
        ,

        startDate: yup
            .date()
            .required(t("errors.startDateRequired"))
        ,

        endDate: yup
            .date()
            .nullable()
            .notRequired()
            .min(
                yup.ref("errors.startDate"), t("errors.endDateAfterStart")
            )
        ,

        description: yup
            .string()
            .trim()
            .required(t("errors.descriptionRequired"))
            .max(250, t("errors.descriptionMax"))
})
