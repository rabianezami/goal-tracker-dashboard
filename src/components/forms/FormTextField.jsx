import TextField from "@mui/material/TextField"
import { Controller } from "react-hook-form"

const FormTextField = ({
    name,
    control,
    slotProps,
    ...props
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    {...props}
                    fullWidth
                    slotProps={slotProps}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                />
            )}
        />
    )
}

export default FormTextField 