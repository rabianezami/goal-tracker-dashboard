import { Card, CardContent, Typography, LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function XPLevelCard({ xp }) {
  const { t } = useTranslation("dashboard");

  const level = Math.floor(xp / 100);
  const progress = xp % 100;

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {t("topSummary.xp")}
        </Typography>

        <Typography variant="h5" fontWeight="bold">
          {t("level")} {level}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ mt: 2, height: 8, borderRadius: 5 }}
        />

        <Typography variant="caption" mt={1}>
          {progress} / 100 XP
        </Typography>
      </CardContent>
    </Card>
  );
}