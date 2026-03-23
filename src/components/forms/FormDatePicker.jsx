import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function FormDatePicker({ name, control, label, ...props }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const value = field.value ? dayjs(field.value) : null; // تبدیل به dayjs
        return (
          <DatePicker
            label={label}
            value={value}
            onChange={(newValue) => field.onChange(newValue ? newValue.toISOString() : null)} // ذخیره به صورت ISO
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!fieldState.error,
                helperText: fieldState.error?.message,
              },
            }}
            {...props}
          />
        );
      }}
    />
  );
}