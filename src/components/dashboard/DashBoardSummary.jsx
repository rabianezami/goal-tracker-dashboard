import { Box, Grid, Typography, Paper, Divider } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { useTranslation } from "react-i18next";
import { useUserStats } from "../../hooks/useUserStats";

export default function DashboardSummary() {
  const { t } = useTranslation("dashboard");
  const { streak, xpTotal } = useUserStats();

  const level = Math.floor(xpTotal / 100);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
      >
        
        {/* 🔥 Streak */}
        <Grid item xs display="flex" justifyContent="center">
          <StatItem
            icon={<LocalFireDepartmentIcon color="error" sx={{ fontSize: 28 }} />}
            label={t("topSummary.streak")}
            value={`${streak} ${t("days")}`}
          />
        </Grid>

        {/* Divider */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            mx: 2,
            borderColor: "rgba(0,0,0,0.15)",
          }}
        />

        {/* ⭐ XP */}
        <Grid item xs display="flex" justifyContent="center">
          <StatItem
            icon={<Box fontSize={26}>⭐</Box>}
            label={t("topSummary.xp")}
            value={`${t("level")} ${level}`}
          />
        </Grid>

      </Grid>
    </Paper>
  );
}

function StatItem({ icon, label, value }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        px: 3,   
      }}
    >
      {/* Icon */}
      <Box>{icon}</Box>

       {/* Value */}
      <Typography variant="h6" fontWeight="bold">
        {value}
      </Typography>

      {/* Label */}
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>

    </Box>
  );
}