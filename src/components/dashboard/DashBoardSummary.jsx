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
        height: "100%",
        borderRadius: 1,
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
        border: "1px solid",
        borderColor: "divider",
        padding: "0.5rem 1rem",
      }}
    >
      <CardContent sx={{ height: "100%" }}>
        <Stack
          spacing={1.5}
          sx={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              color: accentColor,
            }}
          >
            {icon}
            <Typography variant="h4" fontWeight={800}>
              {value}
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              {unit}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
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
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <QuickActions />
      </Grid>

      <Grid item xs={12} md={4}>
        <MetricCard
          icon={<LocalFireDepartmentIcon />}
          value={stats?.streak ?? 0}
          unit={t("summary.streakUnit")}
          helper={t("summary.streakHelper")}
          accentColor="#ea580c"
        />
      </Grid>

      <Grid item xs={12} md={4}>
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
