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
  const { t } = useTranslation("archive");

  const STATUS_MAP = {
    completed: {
      title: t("completedTitle"),
      description: t("completedDesc"),
      statuses: ["completed"],
    },
    incomplete: {
      title: t("incompleteTitle"),
      description: t("incompleteDesc"),
      statuses: ["active", "paused"],
    },
  };

  function getStatusChip(status) {
    switch (status) {
      case "completed":
        return (
          <Chip
            label={t("chip.completed")}
            color="success"
            size="small"
            icon={<CheckCircleIcon />}
          />
        );
      case "paused":
        return (
          <Chip
            label={t("chip.paused")}
            color="warning"
            size="small"
            icon={<PauseCircleIcon />}
          />
        );
      default:
        return (
          <Chip
            label={t("chip.incomplete")}
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
          <Typography variant="h5" fontWeight={700}>
            {current.title}
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={status}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label={t("tabs.completed")} value="completed" />
          <Tab label={t("tabs.incomplete")} value="incomplete" />
        </Tabs>
      </Stack>

      {/* Count */}
      <Typography variant="body2" color="text.secondary" mb={2}>
        {t("count", { count: filteredGoals.length })}
      </Typography>

      {/* Empty */}
      {filteredGoals.length === 0 ? (
        <Box textAlign="center" mt={8}>
          <Typography variant="h6">{t("emptyTitle")}</Typography>
          <Typography variant="body2" color="text.secondary">
            {t("emptyDesc")}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredGoals.map((goal) => (
            <Grid item xs={12} sm={6} md={6} key={goal.id}>
              <Card
                onClick={() => navigate(`/goals/${goal.id}`)}
                sx={{
                  cursor: "pointer",
                  borderRadius: 2,
                  transition: "0.25s",
                  padding: 2,
                  width: "14rem",
                  height: "10rem",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={1}>
                    {/* Title + Status */}
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography fontWeight={600}>
                        {goal.titleKey ? t(goal.titleKey) : goal.title}
                      </Typography>
                      {getStatusChip(goal.status)}
                    </Stack>

                    {/* Description */}
                    {goal.description && (
                      <Typography variant="body2" color="text.secondary">
                        {current.description}
                      </Typography>
                    )}

                    {/* Meta */}
                    <Typography variant="caption" color="text.secondary">
                      {goal.category ||
                        (goal.categoryKey && t(goal.categoryKey)) ||
                        "No category"}
                    </Typography>
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
