import { Card, CardContent, Box, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import StarIcon from "@mui/icons-material/Star";
import { DEFAULT_XP_PER_LOG } from "../utils/xpCalculator";
import QuickActions from "./QuickActions";

function MetricCard({ icon, value, unit, helper, accentColor }) {
  return (
    <Card
      sx={{
        width: "100%",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        mt: 1,
        px: { xs: 2, sm: 2.5 },
        pt: { xs: 2, sm: 1.5 },
        pb: { xs: 0.1, sm: 0.1 },
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Stack spacing={1.2} alignItems="center" textAlign="center">
          {/* Icon */}
          <Box
            sx={{
              width: { xs: 36, sm: 44 },
              height: { xs: 36, sm: 44 },
              borderRadius: "50%",
              backgroundColor: `${accentColor}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: accentColor,
              fontSize: { xs: 20, sm: 24 },
            }}
          >
            {icon}
          </Box>

          {/* Value */}
          <Box display="flex" alignItems="baseline" gap={0.5}>
            <Typography
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              {value}
            </Typography>

            {unit && (
              <Typography
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.85rem" },
                  fontWeight: 600,
                  color: "text.secondary",
                }}
              >
                {unit}
              </Typography>
            )}
          </Box>

          {/* Helper */}
          <Typography
            sx={{
              fontSize: { xs: "0.7rem", sm: "0.8rem" },
              color: "text.secondary",
              opacity: 0.8,
            }}
          >
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
    <Box
      gap={{ xs: 2, sm: 5 }}
      sx={{
        display: "flex",
        flexDirection: "row",

        "@media (max-width:670px)": {
          flexDirection: "column",
        },
      }}
    >
      <QuickActions />

      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "stretch",
        }}
      >
        <Box sx={{ flex: 1, display: "flex" }}>
          <MetricCard
            icon={<LocalFireDepartmentIcon />}
            value={stats?.streak ?? 0}
            unit={t("summary.streakUnit")}
            helper={t("summary.streakHelper")}
            accentColor="#2563eb"
          />
        </Box>

        <Box sx={{ flex: 1, display: "flex" }}>
          <MetricCard
            icon={<StarIcon />}
            value={stats?.xpTotal ?? 0}
            unit={t("summary.xpUnit")}
            helper={t("summary.xpHelper", { amount: DEFAULT_XP_PER_LOG })}
            accentColor="#2563eb"
          />
        </Box>
      </Box>
    </Box>
  );
}
