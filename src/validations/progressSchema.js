import * as yup from "yup";

export const progressSchema = (t, goalType) =>
  yup.object({
    amount: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .when([], {
        is: () => goalType !== "daily",
        then: (schema) =>
          schema
            .required(t("validation.amountRequired"))
            .positive(t("validation.amountPositive")),
      }),

    date: yup
      .date()
      .required(t("validation.dateRequired"))
      .max(new Date(), t("validation.futureDate")),

    note: yup.string().max(200),
  });