import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CustomeButton() {
  const navigate = useNavigate();
  const { t } = useTranslation("dashboard");

  return (
    <Box
      alignItems="center"
      mt={3}
      flexWrap="wrap"
      gap={1}
      sx={{
        display: "flex",
        flexDirection: "row",

        "@media (max-width:670px)": {
          justifyContent: "center",
        },
      }}
    >
      <Box display="flex" gap={2} flexDirection="column">
        <Button
          sx={{ padding: 1.5 }}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/goals/new")}
        >
          {t("quickActions.newGoal")}
        </Button>
        <Button
          sx={{ padding: 1.5 }}
          variant="outlined"
          startIcon={<ListIcon />}
          onClick={() => navigate("/goals")}
        >
          {t("quickActions.viewAll")}
        </Button>
      </Box>
    </Box>
  );
}
