import {
  Container,
  Stack,
  Typography,
  Button,
  Box,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

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
          {/* Icon */}
          <ErrorOutlineIcon
            sx={{
              fontSize: 90,
              opacity: 0.9,
            }}
          />

          {/* 404 */}
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ letterSpacing: 2 }}
          >
            404
          </Typography>

          {/* Title */}
          <Typography variant="h5">
            Page Not Found
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{ opacity: 0.8, maxWidth: 400 }}
          >
            The page you are looking for does not exist
            or may have been moved.
          </Typography>

          {/* Buttons */}
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate(-1)}
              sx={{
                borderColor: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Go Back
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{
                backgroundColor: "#3b82f6",
                "&:hover": {
                  backgroundColor: "#2563eb",
                },
              }}
            >
              Go Back Home
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}