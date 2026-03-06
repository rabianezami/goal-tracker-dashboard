
import * as yup from "yup";

export const goalSchema = (goalTypeOptions, goalCategoryOptions) =>
  yup.object({
    title: yup
        .string()
        .trim()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must not be more that 100 characters")
    ,
    goalCategory: yup
        .string()
        .nullable()
        .required("Type is required")
        .oneOf(
            goalCategoryOptions.map(opt => opt.value), 
            "Invalid type"
        ),
    goalType: yup
        .string()
        .nullable()
        .required("Type is required")
        .oneOf(
            goalTypeOptions.map(opt => opt.value), 
            "Invalid type"
        ),

    target: yup
        .number()
        .typeError("Please choose a number")
        .positive("Please choose a positive number")
        .required("target is required")
    ,

    startDate: yup
        .date()
        .required("Start date is required")
    ,

    endDate: yup
        .date()
        .nullable()
        .notRequired()
        .min(
            yup.ref("startDate"), "End date must be after start date"
        )
    ,

    description: yup
        .string()
        .trim()
        .required()
        .max(250, "Description maximum is 250 characters")
})
