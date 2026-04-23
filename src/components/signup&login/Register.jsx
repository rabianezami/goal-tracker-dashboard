import {Box, Typography, Paper, Button, Divider} from "@mui/material"
import { useTranslation } from "react-i18next";
import {signupSchema} from "../../validations/signupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormTextField from "../forms/FormTextField";
import useAuth from "../../hooks/useAuth";

export default function Register () {
    const { t } = useTranslation("signup")
    const schema = signupSchema(t)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    
    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const {
        control,
        handleSubmit,
        formState: { isValid }
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
    const { signup } = useAuth();
    const onSubmit = (data) => {
        signup({
            name: data.name,
            email: data.email
        });

        navigate("/dashboard");
    };
    

    return (
        <Box>
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

                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <FormTextField
                        label={t("form.name")}
                        name="name"
                        control={control}
                        margin="normal"
                        autoComplete="name"
                    />

                    <FormTextField
                        label={t("form.email")}
                        name="email"
                        control={control}
                        margin="normal"
                        autoComplete="email"
                    />

                    <FormTextField
                        label={t("form.password")}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        control={control}
                        margin="normal"
                        autoComplete="new-password"
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

                    <FormTextField
                        label={t("form.confirmPassword")}
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        control={control}
                        margin="normal"
                        autoComplete="new-password"
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
