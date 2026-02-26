import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import { Controller } from "react-hook-form"

const FormSelectField = ({
    name,
    control,
    options = [],
    ...props
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    select
                    {...props}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
    )
}

export default FormSelectField