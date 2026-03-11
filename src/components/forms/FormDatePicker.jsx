import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function FormDatePicker({ name, control, label, ...props }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DatePicker
          label={label}
          value={field.value}
          onChange={(newValue) => field.onChange(newValue)}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!fieldState.error,
              helperText: fieldState.error?.message,
            },
          }}
          {...props}
        />
      )}
    />
  );
}