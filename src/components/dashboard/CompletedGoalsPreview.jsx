import { useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGoals } from "../../context/GoalsContext";

export default function CompletedGoalsPreview() {
  const { goals = [] } = useGoals();
  const navigate = useNavigate();
  const { t } = useTranslation("dashboard");

  const completedGoals = useMemo(() => {
    return goals
      .filter((g) => g.status === "completed")
      .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
      .slice(0, 4);
  }, [goals]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 750,
        mx: "auto",
        mt: 4,
        px: { xs: 1.5, sm: 2 },
        py: 2,
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight={800}>
              {t("completedPreview.title")}
            </Typography>

            <Button
              size="small"
              endIcon={<ArrowForwardIosIcon fontSize="small" />}
              onClick={() => navigate("/goals/archive/completed")}
              sx={{ textTransform: "none" }}
            >
              {t("completedPreview.viewArchive")}
            </Button>
          </Box>

          <Divider />

          {/* List */}
          {completedGoals.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              {t("completedPreview.empty")}
            </Typography>
          ) : (
            <Grid container spacing={1.5}>
              {completedGoals.map((goal) => (
                <Grid item xs={6} key={goal.id}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2.2,
                      borderRadius: 2,
                      bgcolor: "action.hover",
                      gap: 1,
                      minWidth: 0,
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography fontWeight={600} fontSize={14} noWrap>
                        {goal.titleKey
                          ? t(goal.titleKey, { ns: "translation" })
                          : goal.title}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        noWrap
                      >
                        {goal.categoryKey
                          ? t(goal.categoryKey, { ns: "translation" })
                          : goal.category}
                      </Typography>
                    </Box>

                    <Chip
                      icon={<CheckCircleIcon />}
                      label={t("completedPreview.done")}
                      color="success"
                      size="small"
                      sx={{ flexShrink: 0 }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      </CardContent>
    </Box>
  );
}
