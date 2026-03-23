import { Card, Typography, Box, Stack, LinearProgress } from "@mui/material"
import useUserStats from "../../hooks/useUserState"

export default function DashboardSummary() {
 const { completionRate, completedCount, } = useUserStats()

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        background: "linear-gradient(135deg, #4F46E5, #3B82F6)",
        color: "#fff",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6">Progress</Typography>

        <Typography variant="h4" fontWeight={700}>
          {completionRate}%
        </Typography>

        <LinearProgress
          variant="determinate"
          value={completionRate}
          sx={{
            height: 8,
            borderRadius: 5,
            backgroundColor: "rgba(255,255,255,0.2)",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#fff",
            },
          }}
        />

        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography variant="body2">Completed</Typography>
            <Typography fontWeight={600}>
              {completedCount}/{totalGoals}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2">Status</Typography>
            <Typography fontWeight={600}>
              On track
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Card>
  )
}