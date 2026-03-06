import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useTranslation } from "react-i18next"
import { Paper, Box, Button, Grid, Typography } from "@mui/material"

import FlagIcon from "@mui/icons-material/Flag"
import NumbersIcon from "@mui/icons-material/Numbers"
import MergeTypeIcon from "@mui/icons-material/MergeType"
import CategoryIcon from "@mui/icons-material/Category"
import DescriptionIcon from "@mui/icons-material/Description"
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

import { goalSchema } from "../../validations/goalSchema"
import FormTextField from "./FormTextField"
import FormSelectField from "./FormSelectField"
import FormDatePicker from "./FormDatePicker"

export default function GoalForm({ defaultValues }) {
  const { t } = useTranslation("createGoal")

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(goalSchema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      goalType: "",
      goalCategory: "",
      target: "",
      startDate: null,
      endDate: null,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const goalTypeOptions = t("goalTypeOptions", { returnObjects: true })
  const goalCategoryOptions = t("goalCategoryOptions", { returnObjects: true })

  return (
    <Box
      sx={{
        Height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, md: 4 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 650,
          p: { xs: 2, sm: 3, md: 5},
        }}
      >
        <Box textAlign="center" mb={4}>
          <Typography variant="h5">{t("title")}</Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            {t("subtitle")}
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} >
          <Grid container spacing={3}>
            <Grid size={12}>
              <FormTextField
                name="title"
                label={t("fields.goalTitle")}
                control={control}
                placeholder={t("placeholders.goalTitle")}
                icon={<FlagIcon fontSize="small" />}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormSelectField
                name="goalType"
                label={t("fields.goalType")}
                control={control}
                options={goalTypeOptions}
                icon={<MergeTypeIcon fontSize="small" />}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormTextField
                name="target"
                label={t("fields.target")}
                control={control}
                type="number"
                icon={<NumbersIcon fontSize="small" />}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormDatePicker
                name="startDate"
                label={t("fields.startDate")}
                control={control}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormDatePicker
                name="endDate"
                label={t("fields.endDate")}
                control={control}
              />
            </Grid>

            <Grid size={12}>
              <FormTextField
                name="description"
                label={t("fields.description")}
                placeholder={t("placeholders.description")}
                multiline
                rows={4}
                control={control}
                icon={<DescriptionIcon fontSize="small" />}
              />
            </Grid>

            <Grid size={12}>
              <FormSelectField
                name="goalCategory"
                label={t("fields.goalCategory")}
                control={control}
                options={goalCategoryOptions}
                icon={<CategoryIcon fontSize="small" />}
              />
            </Grid>

            <Grid size={12} mt={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                startIcon={<CreateNewFolderIcon fontSize="small"  />}
                sx={{
                  py: 1.4,
                  textTransform: "none",
                }}
              >
                {t("buttons.create")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}