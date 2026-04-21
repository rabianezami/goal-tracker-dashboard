import {Box, Typography, Paper, TextField, Button, Divider, IconButton, InputAdornment} from "@mui/material";
import { useTranslation } from "react-i18next";
import {signupSchema} from "../../validations/signupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

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
        register, 
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

    const { login } = useContext(AuthContext);
    const onSubmit = (data) => {
        login({
            name: data.name,
            email: data.email
        });

        navigate("/");
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
                    <TextField
                        fullWidth
                        label={t("form.name")}
                        name="name"
                        margin="normal"
                        {...register("name")}
                        autoComplete="name"
                    />

                    <TextField
                        fullWidth
                        label={t("form.email")}
                        name="email"
                        margin="normal"
                        {...register("email")}
                        autoComplete="email"
                    />

                    <TextField
                        fullWidth
                        label={t("form.password")}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        margin="normal"
                        {...register("password")}
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

                    <TextField
                        fullWidth
                        label={t("form.confirmPassword")}
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        margin="normal"
                        {...register("confirmPassword")}
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