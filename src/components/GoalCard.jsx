import { Card, Typography, Checkbox, LinearProgress, Stack, Box } from "@mui/material";

export default function GoalCard({ goal }) {
  return (
    <Card
      sx={{
        p: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: 1.5
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Checkbox
          checked={goal.status === "completed"}
          sx={{
            color: goal.color,
            "&.Mui-checked": {
              color: goal.color
            }
          }}
        />

        <Box sx={{ textAlign: "right", flexGrow: 1 }}>
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
                goal.status === "active"
                  ? "#E3F2FD"
                  : goal.status === "completed"
                  ? "#E8F5E9"
                  : "#FFF3E0",
              color:
                goal.status === "active"
                  ? "#1976D2"
                  : goal.status === "completed"
                  ? "#2E7D32"
                  : "#EF6C00"
            }}
          >
            {goal.status === "active" && "فعال"}
            {goal.status === "completed" && "تکمیل شده"}
            {goal.status === "paused" && "متوقف"}
          </Typography>

          <Typography fontWeight={600}>
            {goal.title}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              bgcolor: "#f1f3f5",
              px: 1,
              py: 0.3,
              borderRadius: 2,
              display: "inline-block",
              mt: 0.5
            }}
          >
            {goal.category}
          </Typography>
        </Box>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={goal.progress}
        sx={{
          height: 6,
          borderRadius: 5,
          backgroundColor: "#eee",
          "& .MuiLinearProgress-bar": {
            backgroundColor: goal.color
          }
        }}
      />

      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          textAlign: "left"
        }}
      >
        {goal.date}
      </Typography>
    </Card>
  );
}