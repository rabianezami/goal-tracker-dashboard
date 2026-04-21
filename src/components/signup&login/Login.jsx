import { Box, Typography, Paper, Button, Divider, IconButton, InputAdornment} from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { loginSchema } from "../../validations/loginSchema";
import FormTextField from "../forms/FormTextField";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "notistack";

// impor
export default function Login() {
  const { t } = useTranslation("login")
  const schema = loginSchema(t)
  const navigate = useNavigate()
  const { login } = useAuth()

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    control,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onTouched"
  });
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    login({ // this is fake since we don't have backend
      name: "User",
      email: data.email
    });

    navigate("/");
    enqueueSnackbar(t("WELCOME_BACK!"), { variant: "success" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography textAlign="center" mb={2}>
          {t("form.loginAccount")}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <FormTextField
            fullWidth
            label={t("form.email")}
            name="email"
            control={control}
            margin="normal"
            autoComplete="email"
          />

          <FormTextField
            fullWidth
            label={t("form.password")}
            type={showPassword ? "text" : "password"}
            name="password"
            control={control}
            margin="normal"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isValid}
            sx={{ mt: 2 }}
          >
            {t("form.login")}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}