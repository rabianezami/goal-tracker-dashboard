import { Box, Typography, Paper, Button, Divider, IconButton, InputAdornment} from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { loginSchema } from "../../validations/loginSchema";
import FormTextField from "../forms/FormTextField";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "notistack";
import video from "../../assets/video2.json";
import Lottie from "lottie-react";

export default function Login() {
  const { t } = useTranslation("login")
  const schema = loginSchema(t)
  const navigate = useNavigate()
  const { login, isLoggedIn } = useAuth()

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn]);
  
  const {
    control,
    handleSubmit,
    formState: { isValid }
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
    
    enqueueSnackbar(t("WELCOME_BACK"), { variant: "success" });
  };

  const handleSignup = () => {
    navigate("/signup")
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        my: 4
      }}
    >
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography textAlign="center" mb={2} variant="h6">
          {t("form.loginAccount")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Lottie
            animationData={video}
            loop
            style={{width: "100%", maxWidth: 600, height: 200 }}
          />
        </Box>
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
          <Typography sx={{
            textAlign: "center",
            fontSize: 15,
            my: 2,
            cursor: "pointer",
            textDecoration: "none",
            "&:hover": {
            textDecoration: "underline",
            },
            color: "primary.main"
          }}
          onClick={handleSignup}
          >
            {t("form.createAccount")}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}