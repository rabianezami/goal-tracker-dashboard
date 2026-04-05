import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { progressSchema } from "../../validations/progressSchema";
import { useTranslation } from "react-i18next";

export default function ProgressEntryDialog({
  open,
  onClose,
  onAdd,
  goalType,
}) {
  const { t } = useTranslation("goalDetails");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(progressSchema(t, goalType)),
    defaultValues: {
      amount: "",
      note: "",
      date: new Date().toISOString().slice(0, 10),
    },
  });

  const submitHandler = (data) => {
    onAdd({
      amount: Number(data.amount),
      description: data.description,
      date: data.date,
    });

    reset();
    onClose()
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{t("progress.addProgress")}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          
          {/* Date */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                label={t("progress.date")}
                InputLabelProps={{ shrink: true }}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />

          {/* Amount */}
          {goalType !== "daily" && (
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label={t("progress.amount")}
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                />
              )}
            />
          )}

          {/* Note */}
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("progress.notes")}
                multiline
                rows={2}
                error={!!errors.note}
                helperText={errors.note?.message}
              />
            )}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          {t("buttons.cancel")}
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit(submitHandler)}
        >
          {t("buttons.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}