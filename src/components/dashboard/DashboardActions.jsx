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
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      m={3}
      flexWrap="wrap"
      gap={1}
    >
      <Box display="flex" gap={2} flexDirection="column">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/goals/new")}
        >
          {t("quickActions.newGoal")}
        </Button>
        <Button
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
