import {
  Box,
  Card,
  Typography,
  Checkbox,
  LinearProgress,
  Stack,
  Button,
} from "@mui/material";
import DeleteConfirmDialog from "../dialog/DeleteConfirmDialog";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import useGoalProgress from "../../hooks/useGoalProgress";

export default function GoalCard({
  id,
  title,
  goalCategory,
  description,
  progress,
  target,
  logs,
  status,
  color,
  onEdit,
  onDelete,
  onToggleStatus,
  onClick,
  onAddProgress,
  variant = "default",
  showActions = true,
  showMeta = true,
  showProgressText = true,
  showCheckbox = true,
}) {
  const [openDelete, setOpenDelete] = useState(false);

  const { t } = useTranslation();
  const { t: tCategories } = useTranslation("categories");

  const { total, percent } = useGoalProgress({
    progress,
    target,
    logs,
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: variant === "archive" ? "100%" : { xs: "100%", sm: 600 },
        mx: variant === "archive" ? 0 : "auto",
        mt: 2,
        px: variant === "archive" ? 0 : { xs: 1, sm: 2 },
      }}
    >
      <Stack spacing={1}>
        <Card
          onClick={onClick}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: { xs: 2, sm: 3 },
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            gap: 1,
            cursor: "pointer",
            "&:hover": {
              boxShadow: 6,
              transform: "translateY(-4px)",
            },
          }}
        >
          {/* Header */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={1}
          >
            {showCheckbox && variant !== "archive" && (
              <Checkbox
                checked={status === "completed"}
                sx={{ color, "&.Mui-checked": { color } }}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  onToggleStatus(id);
                }}
              />
            )}

            <Box sx={{ flexGrow: 1 }}>
              {/* Status */}
              <Typography
                variant="caption"
                sx={{
                  px: 1,
                  py: 0.6,
                  borderRadius: 2,
                  display: "inline-block",
                  mb: 1,
                  bgcolor:
                    status === "active"
                      ? "primary.light"
                      : status === "completed"
                        ? "success.light"
                        : "warning.light",
                  color: "#fff",
                }}
              >
                {t(`status.${status}`)}
              </Typography>

              {/* Title */}
              <Typography fontWeight={800} mb={1}>
                {title}
              </Typography>

              {/* Description */}
              {showMeta && description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {description}
                </Typography>
              )}

              {/* Category */}
              {showMeta && goalCategory && (
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
                  {tCategories(`categoriesName.${goalCategory}`)}
                </Typography>
              )}
            </Box>
          </Stack>

          {/* Progress */}
          {variant !== "archive" && (
            <>
              <LinearProgress
                variant="determinate"
                value={percent}
                sx={{
                  height: 6,
                  borderRadius: 5,
                  "& .MuiLinearProgress-bar": { backgroundColor: color },
                  mt: 1,
                }}
              />

              {showProgressText && (
                <Typography variant="caption" color="text.secondary">
                  {total} / {target}
                </Typography>
              )}
            </>
          )}

          {/* Actions */}
          {variant !== "archive" && showActions && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{ mt: 1, justifyContent: "flex-end" }}
            >
              <Button
                size="small"
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(id);
                }}
              >
                {t("button.edit")}
              </Button>

              <Button
                size="small"
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddProgress();
                }}
              >
                {t("button.Progress")}
              </Button>

              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDelete(true);
                }}
              >
                {t("button.delete")}
              </Button>

              <Button
                size="small"
                variant="contained"
                color={status === "completed" ? "success" : "warning"}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStatus(id);
                }}
              >
                {status === "completed"
                  ? t("button.resume")
                  : t("button.paused")}
              </Button>
            </Stack>
          )}
        </Card>

        <DeleteConfirmDialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          onConfirm={() => {
            onDelete(id);
            setOpenDelete(false);
          }}
        />
      </Stack>
    </Box>
  );
}
