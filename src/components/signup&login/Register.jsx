import {Box, Typography, Paper, TextField, Button, Divider} from "@mui/material"
import { useTranslation } from "react-i18next";
import {signupSchema} from "../../validations/signupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";

export default function Register () {

    const { t } = useTranslation("signup")
    const schema = signupSchema(t)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const { 
        register, 
        handleSubmit,
        formState: { isValid, errors } 
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onTouched",
        reValidateMode: "onChange"
    });
   

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: 400,
                    borderRadius: 1,
                }}
            >
                <Typography variant="h6" mb={2} textAlign="center">
                    {t("form.registerAccount")}
                </Typography>

                <Divider 
                    sx={{
                        mx: 10,
                        color: "primary"
                    }}
                />

                <Box component="form">
                    <TextField
                        fullWidth
                        label={t("form.name")}
                        name="name"
                        margin="normal"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />

                    <TextField
                        fullWidth
                        label={t("form.email")}
                        name="email"
                        margin="normal"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        fullWidth
                        label={t("form.password")}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        margin="normal"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePassword} edge="end">
                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        label={t("form.confirmPassword")}
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        margin="normal"
                        {...register("confirmPassword")}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleToggleConfirmPassword} edge="end">
                                {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2 }}
                        disabled={!isValid}
                    >
                        {t("form.register")}
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}