// components/GoalCard.jsx
import {
  Box,
  Card,
  Typography,
  Checkbox,
  LinearProgress,
  Stack,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function GoalCard({
  title,
  id,
  category,
  progress,
  date,
  status,
  color,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  const { t } = useTranslation("goalList");

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: 600 },
        mx: "auto",
        mt: 2,
        px: { xs: 1, sm: 2 },
      }}
    >
      <Stack spacing={1}>
        <Card
          sx={{
            p: { xs: 1.5, sm: 2 },
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={1}
          >
            <Checkbox
              checked={status === "completed"}
              sx={{ color, "&.Mui-checked": { color } }}
            />

            <Box sx={{ textAlign: "start", flexGrow: 1 }}>
              {/* Status */}
              <Typography
                variant="caption"
                sx={{
                  px: 1,
                  py: 0.3,
                  borderRadius: 2,
                  display: "inline-block",
                  mb: 0.5,
                  fontSize: 11,
                  bgcolor:
                    status === "active"
                      ? "primary.light"
                      : status === "completed"
                        ? "success.light"
                        : "warning.light",
                  color:
                    status === "active"
                      ? "primary"
                      : status === "completed"
                        ? "success"
                        : "warning",
                }}
              >
                {t(`status.${status}`)}
              </Typography>

              {/* Title */}
              <Typography fontWeight={600}>
                {t(`titles.${title}`)}
              </Typography>

              {/* Category */}
              <Typography
                variant="caption"
                sx={{
                  bgcolor: "action.hover",
                  px: 1,
                  py: 0.3,
                  borderRadius: 2,
                  display: "inline-block",
                  mt: 0.5,
                }}
              >
                {t(`categories.${category}`)}
              </Typography>
            </Box>
          </Stack>

          {/* Progress */}
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 5,
              backgroundColor: "action.disabledBackground",
              "& .MuiLinearProgress-bar": { backgroundColor: color },
              mt: 1,
            }}
          />

          {/* Date */}
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              textAlign: "left",
              mt: 0.5,
            }}
          >
            {date}
          </Typography>

          {/* Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{ mt: 1, justifyContent: "flex-end", width: "100%" }}
          >
            <Button
              size="small"
              variant="outlined"
              color="primary"
              sx={{ width: { xs: "100%", sm: "auto" } }}
              onClick={onEdit}
            >
              {t("buttons.edit")}
            </Button>

            <Button
              size="small"
              variant="outlined"
              color="error"
              sx={{ width: { xs: "100%", sm: "auto" } }}
              onClick={onDelete}
            >
              {t("buttons.delete")}
            </Button>

            <Button
              size="small"
              variant="contained"
              sx={{ width: { xs: "100%", sm: "auto" } }}
              color={status === "paused" ? "success" : "warning"}
              onClick={onToggleStatus}
            >
              {status === "paused"
                ? t("buttons.resume")
                : t("buttons.pause")}
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}