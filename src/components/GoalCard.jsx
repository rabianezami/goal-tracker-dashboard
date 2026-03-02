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

export default function GoalCard({
  title,
  category,
  progress,
  date,
  status,
  color,
  onEdit,
  onDelete,
  onToggleStatus,
  onClick,
}) {
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
            direction={{ xs: "column", sm: "row" }} // موبایل ستونه، دسکتاپ ردیف
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={1}
          >
            <Checkbox
              checked={status === "completed"}
              sx={{ color, "&.Mui-checked": { color } }}
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
                {status === "active" && "فعال"}
                {status === "completed" && "تکمیل شده"}
                {status === "paused" && "متوقف"}
              </Typography>

              <Typography fontWeight={600}>{title}</Typography>

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
                {category}
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
            direction={{ xs: "column", sm: "row" }} // موبایل ستون، دسکتاپ ردیف
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
              Edit
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
              Delete
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
              {status === "paused" ? "Resume" : "Pause"}
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
