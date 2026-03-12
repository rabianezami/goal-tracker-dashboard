import {
  Container,
  Stack,
  Typography,
  Button,
  Box,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("common");

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          p: 5,
          borderRadius: 4,
          textAlign: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "white",
          boxShadow: 6,
        }}
      >
        <Stack spacing={3} alignItems="center">

          <ErrorOutlineIcon sx={{ fontSize: 90, opacity: 0.9 }} />

          <Typography variant="h2" fontWeight="bold" sx={{ letterSpacing: 2 }}>
            404
          </Typography>

          <Typography variant="h5">
            {t("notFound.title")}
          </Typography>

          <Typography
            variant="body1"
            sx={{ opacity: 0.8, maxWidth: 400 }}
          >
            {t("notFound.description")}
          </Typography>

          {/* مسیر اشتباه */}
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            {t("notFound.path")} : {location.pathname}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate(-1)}
              sx={{
                borderColor: "white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              {t("common.goBack")}
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{
                backgroundColor: "#3b82f6",
                "&:hover": { backgroundColor: "#2563eb" },
              }}
            >
              {t("notFound.home")}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}