import { Controller } from "react-hook-form"
import { TextField, InputAdornment } from "@mui/material"

const FormTextField = ({
  name,
  control,
  label,
  icon,
  helperText,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;

        return (
          <TextField
            {...field}
            {...props}
            fullWidth
            label={label}
            error={hasError}
            helperText={hasError ? fieldState.error.message : helperText}
            slotProps={{
              input: {
                startAdornment: icon ? (
                  <InputAdornment position="start">
                    {icon}
                  </InputAdornment>
                ) : undefined,
              }
            }}
          />
        )
      }}
    />
  )
}

export default FormTextField