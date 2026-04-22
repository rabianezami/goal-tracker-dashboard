import { Box, Typography, LinearProgress, Stack, Chip, CardContent } from "@mui/material";
import { useTranslation } from "react-i18next";
import DashboardContainer from "../dashboard/DashboardContainer";

export default function CategoryCard({ title, total, active, completed, goals = [] }) {
  const { t } = useTranslation("categories");

  // calculation of all goals
  const totalProgress = goals.reduce((sum, goal) => {
    const target = Number(goal.target || 0);
    const progress = Number(goal.progress || 0);
    if (!target) return sum;
    
    const percent = Math.min(100, Math.round((progress / target) * 100));
    return sum + percent;
  }, 0);

  //percent of all category
  const progress = total === 0 ? 0 : Math.round(totalProgress / total);

  return (
    <DashboardContainer>
      <CardContent>
        {/* Title */}
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2, textTransform: "capitalize" }} >
          {title}
        </Typography>

        {/* Stats */}
        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" useFlexGap   sx={{ gap: 1 }}>
          <Chip label={t("list.total", { total })} size="small" sx={{ fontWeight: 500 }} />
          <Chip label={t("list.active", { active })} size="small" color="primary" variant="outlined" />
          <Chip label={t("list.completed", { completed })} size="small" color="success" variant="outlined" />
        </Stack>

        {/* Progress */}
        <Box>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 5, backgroundColor: "action.hover", "& .MuiLinearProgress-bar": { borderRadius: 5, }, }} />
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography variant="caption" color="text.secondary">
              {t("list.completionPercentage", { percent: progress })}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {completed}/{total}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </DashboardContainer>
  );
}