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
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { useTranslation } from "react-i18next";
import { useState } from "react";
export default function GoalCard({
  id,
  title,
  category,
  titleKey,
  categoryKey,
  progress,
  target,
  date,
  status,
  color,
  onEdit,
  onDelete,
  onToggleStatus,
  onClick,
  onAddProgress
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const { t } = useTranslation();

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
          onClick={onClick}
          sx={{
            p: { xs: 1.5, sm: 2 },
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            cursor: "pointer",
            "&:hover": {
              boxShadow: 6,
            },
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
              onChange={(e) => {
                e.stopPropagation();
                onToggleStatus(id);
              }}
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
                        ? "#2E7D32"
                        : "#EF6C00",
                }}
              >
                {status === "active" && t("status.active")}
                {status === "completed" && t("status.completed")}
                {status === "paused" && t("status.paused")}
              </Typography>

              <Typography fontWeight={600}>
                {titleKey ? t(titleKey) : title}

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
                {categoryKey ? t(categoryKey) : category}
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
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", mt: 0.5 }}
          >
            {progress} / {target}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", textAlign: "left", mt: 0.5 }}
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
              color="primary"
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
              sx={{ width: { xs: "100%", sm: "auto" } }}
              color={status === "completed" ? "success" : "warning"}
              onClick={(e) => {
                e.stopPropagation();
                onToggleStatus(id);
              }}
            >
              {status === "completed" ? t("button.resume") : t("button.paused")}
            </Button>
          </Stack>
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
