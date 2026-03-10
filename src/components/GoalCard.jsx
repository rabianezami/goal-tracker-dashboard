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
  id,
  title,
  category,
  titleKey,
  categoryKey,
  progress,
  date,
  status,
  color,
  onEdit,
  onDelete,
  onToggleStatus,
  onClick,
}) 
{

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
          {/* Header: Checkbox + Status + Title + Category */}
          <Stack
            direction={{ xs: "column", sm: "row" }} 
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={1}
          >
            <Checkbox
              checked={status === "completed"}
              sx={{ color, "&.Mui-checked": { color } }}
              onChange={()=> onToggleStatus(id)}
            />

            <Box sx={{ textAlign: { xs: "left", sm: "right" }, flexGrow: 1 }}>
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
                      ? "#E3F2FD"
                      : status === "completed"
                        ? "#E8F5E9"
                        : "#FFF3E0",
                  color:
                    status === "active"
                      ? "#1976D2"
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

              <Typography
                variant="caption"
                sx={{
                  bgcolor: "#f1f3f5",
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
              backgroundColor: "#eee",
              "& .MuiLinearProgress-bar": { backgroundColor: color },
              mt: 1,
            }}
          />

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
                onEdit();
              }}
            >
              {t("button.edit")}
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              {t("button.delete")}
            </Button>
            <Button
              size="small"
              variant="contained"
              color={status === "paused" ? "success" : "warning"}
              onClick={(e) => {
                e.stopPropagation();
                onToggleStatus();
              }}
            >
              {status === "paused" ? t("button.resume") : t("button.paused")}
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
