import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGoals } from "../context/GoalsContext";
import { useTranslation } from "react-i18next";

import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

export default function ArchivePage() {
  const { t } = useTranslation(["archive", "translation"]);

  const STATUS_MAP = {
    completed: {
      title: t("completedTitle"),
      statuses: ["completed"],
    },
    incomplete: {
      title: t("incompleteTitle"),
      statuses: ["active", "paused"],
    },
  };

  function getStatusChip(status) {
    switch (status) {
      case "completed":
        return (
          <Chip
            label={t("status.completed", { ns: "translation" })}
            color="success"
            size="small"
            icon={<CheckCircleIcon />}
          />
        );
      case "paused":
        return (
          <Chip
            label={t("status.paused", { ns: "translation" })}
            color="warning"
            size="small"
            icon={<PauseCircleIcon />}
          />
        );
      default:
        return (
          <Chip
            label={t("status.active", { ns: "translation" })}
            color="info"
            size="small"
            icon={<HourglassTopIcon />}
          />
        );
    }
  }

  const { status = "completed" } = useParams();
  const navigate = useNavigate();
  const { goals } = useGoals();

  const current = STATUS_MAP[status] || STATUS_MAP.completed;

  const filteredGoals = useMemo(() => {
    return goals.filter((goal) => current.statuses.includes(goal.status));
  }, [goals, current.statuses]);

  const handleTabChange = (_, newValue) => {
    navigate(`/goals/archive/${newValue}`);
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        spacing={2}
      >
        <Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            {current.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {current.description}
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={status}
          onChange={handleTabChange}
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 3,
            p: 0.5,
            minHeight: "auto",

            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          <Tab
            label={t("tabs.completed")}
            value="completed"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 600,
              minHeight: "36px",
              px: 2,

              "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "#fff",
              },
            }}
          />

          <Tab
            label={t("tabs.incomplete")}
            value="incomplete"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 600,
              minHeight: "36px",
              px: 2,

              "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "#fff",
              },
            }}
          />
        </Tabs>
      </Stack>

      {/* Count */}
      <Typography variant="body1" color="text.secondary" mb={3}>
        {t("count", { count: filteredGoals.length })}
      </Typography>

      {/* Empty */}
      {filteredGoals.length === 0 ? (
        <Box textAlign="center" mt={8}>
          <Typography variant="h6">
            {t("emptyTitle", { ns: "translation" })}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("emptyDesc", { ns: "translation" })}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredGoals.map((goal) => (
            <Grid item xs={12} sm={6} md={4} key={goal.id}>
              <Card
                onClick={() => navigate(`/goals/${goal.id}`)}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 4,
                  p: 2,
                  transition: "0.3s",
                  background: "linear-gradient(145deg, #ffffff, #f5f5f5)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",

                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack spacing={1}>
                    {/* Status */}
                    <Stack direction="row" justifyContent="space-between">
                      {getStatusChip(goal.status)}
                    </Stack>

                    {/* Title */}
                    <Typography fontWeight={700} fontSize={16}>
                      {goal.titleKey
                        ? t(goal.titleKey, { ns: "translation" })
                        : goal.title}
                    </Typography>

                    {/* Description */}
                    {goal.descriptionKey && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {t(goal.descriptionKey || "", { ns: "translation" })}
                      </Typography>
                    )}

                    {/* Category */}
                    <Box
                      sx={{
                        mt: 1,
                        display: "inline-block",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        backgroundColor: "action.hover",
                        fontSize: 12,
                        width: "fit-content",
                      }}
                    >
                      {goal.categoryKey
                        ? t(goal.categoryKey, { ns: "translation" })
                        : goal.category ||
                          t("noCategory", { ns: "translation" })}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
