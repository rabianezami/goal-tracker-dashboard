import { Box, Grid, Typography, Paper } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useTranslation } from "react-i18next";

import { useUserStats } from "../../hooks/useUserStats";

export default function DashboardSummary() {
  const { t } = useTranslation("dashboard");

  const { overallProgress, completedGoals, streak, xpTotal } = useUserStats();

  const level = Math.floor(xpTotal / 100);
  const xpProgress = xpTotal % 100;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
      }}
    >
      {/* Top row */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h6" fontWeight="bold">
          {t("title")}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {t("progressText", { value: overallProgress })}
        </Typography>
      </Box>

      {/* Stats */}
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <StatItem
            icon={<TrendingUpIcon color="primary" />}
            label={t("topSummary.completion")}
            value={`${overallProgress}%`}
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <StatItem
            icon={<CheckCircleIcon color="success" />}
            label={t("topSummary.completedGoals")}
            value={completedGoals}
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <StatItem
            icon={<LocalFireDepartmentIcon color="error" />}
            label={t("topSummary.streak")}
            value={`${streak} ${t("days")}`}
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <StatItem
            icon={"⭐"}
            label={t("topSummary.xp")}
            value={`${t("level")} ${level}`}
          />
        </Grid>
      </Grid>

      {/* XP Bar */}
      <Box mt={3}>
        <Typography variant="body2" mb={1}>
          {t("xpProgress")} ({xpProgress}/100)
        </Typography>

        <Box
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: "#e5e7eb",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: `${xpProgress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #6366f1, #22c55e)",
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
}

function StatItem({ icon, label, value }) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Box>{icon}</Box>

      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>

        <Typography fontWeight="bold">{value}</Typography>
      </Box>
    </Box>
  );
}