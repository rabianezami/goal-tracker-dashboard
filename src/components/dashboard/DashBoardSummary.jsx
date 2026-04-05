import { Card, CardContent, Grid, Box, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import StarIcon from "@mui/icons-material/Star";
import { DEFAULT_XP_PER_LOG } from "../utils/xpCalculator";
import QuickActions from "./QuickActions";

function MetricCard({ icon, value, unit, helper, accentColor }) {
  return (
     <Card
      sx={{
        height: 120,           
        minWidth: 120,         
        borderRadius: 1,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        border: "1px solid",
        borderColor: "divider",
        padding: "0.2rem 0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardContent sx={{ width: "100%", height: "100%", padding: 0 }}>
        <Stack
          spacing={0.5}        
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >

          <Box sx={{ color: accentColor, fontSize: 18 }}>
            {icon}
          </Box>

          <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.25 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {value}
            </Typography>
            {unit && (
              <Typography variant="body2" fontWeight={700} color="text.secondary">
                {unit}
              </Typography>
            )}
          </Box>

          <Typography variant="caption" color="text.secondary">
            {helper}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function DashboardSummary({ stats }) {
  const { t } = useTranslation("dashboard");

  return (
    <Grid container spacing={0.25}>
      <Grid item xs={12}>
        <QuickActions />
      </Grid>

      <Grid item xs={12}>
        <MetricCard
          icon={<LocalFireDepartmentIcon />}
          value={stats?.streak ?? 0}
          unit={t("summary.streakUnit")}
          helper={t("summary.streakHelper")}
          accentColor="#ea580c"
        />
      </Grid>

      <Grid item xs={12} >
        <MetricCard
          icon={<StarIcon />}
          value={stats?.xpTotal ?? 0}
          unit={t("summary.xpUnit")}
          helper={t("summary.xpHelper", { amount: DEFAULT_XP_PER_LOG })}
          accentColor="#2563eb"
        />
      </Grid>
    </Grid>
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