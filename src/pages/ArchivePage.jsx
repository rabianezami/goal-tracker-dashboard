import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGoals } from "../context/GoalsContext";
import { useTranslation } from "react-i18next";

import { Box, Typography, Tabs, Tab, Grid, Stack } from "@mui/material";

import GoalCard from "../components/GoalCard";

export default function ArchivePage() {
  const { t } = useTranslation(["archive", "translation"]);
  const { status = "completed" } = useParams();
  const navigate = useNavigate();
  const { goals } = useGoals();

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

  const current = STATUS_MAP[status] || STATUS_MAP.completed;

  const filteredGoals = useMemo(() => {
    return goals.filter((g) => current.statuses.includes(g.status));
  }, [goals, current.statuses]);

  return (
    <Box p={3}>
      {/* Header */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h4" fontWeight={800} mb={3}>
            {current.title}
          </Typography>
          <Typography color="text.secondary">{current.description}</Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={status}
          onChange={(_, v) => navigate(`/goals/archive/${v}`)}
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 3,
            p: 0.5,
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
          <Tab
            value="completed"
            label={t("tabs.completed")}
            sx={{
              borderRadius: 2,
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "#fff",
              },
            }}
          />
          <Tab
            value="incomplete"
            label={t("tabs.incomplete")}
            sx={{
              borderRadius: 2,
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "#fff",
              },
            }}
          />
        </Tabs>
      </Stack>

      {/* Count */}
      <Typography mb={3}>
        {t("count", { count: filteredGoals.length })}
      </Typography>

      {/* Empty */}
      {filteredGoals.length === 0 ? (
        <Box textAlign="center" mt={10}>
          <Typography variant="h6">{t("emptyTitle")}</Typography>
          <Typography color="text.secondary">{t("emptyDesc")}</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredGoals.map((goal) => (
            <Grid item xs={12} sm={6} md={4} key={goal.id}>
              <GoalCard
                {...goal}
                onClick={() => navigate(`/goals/${goal.id}`)}
                variant="archive"
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
