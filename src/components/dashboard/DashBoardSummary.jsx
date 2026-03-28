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
        p: 2,
        borderRadius: 2, // 🔽 smaller radius
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <Grid container alignItems="center">
        
        {/* 🔥 Streak */}
        <Grid item xs={6}>
          <StatItem
            icon={<LocalFireDepartmentIcon color="error" />}
            label={t("topSummary.streak")}
            value={`${streak} ${t("days")}`}
          />
        </Grid>

        {/* Divider with spacing */}
        <Box
          sx={{
            px: 1, // 👈 space left & right of divider
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Divider
            orientation="vertical"
            sx={{
              height: 40, // 👈 shorter line
              borderColor: "rgba(0,0,0,0.15)",
            }}
          />
        </Box>

        {/* ⭐ XP */}
        <Grid item xs={6}>
          <StatItem
            icon={"⭐"}
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
    <Box display="flex" flexDirection="column" alignItems="center">
      
      <Box display="flex" alignItems="center" gap={1}>
        {icon}
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>

      <Typography variant="h6" fontWeight="bold" mt={1}>
        {value}
      </Typography>
    </Box>
  );
}