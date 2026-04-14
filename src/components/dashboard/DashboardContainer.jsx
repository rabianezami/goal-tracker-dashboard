import { Box } from "@mui/material";
import ActiveGoalsList from "./ActiveGoalLists";
import CompletedGoalsPreview from "./CompletedGoalsPreview";
export default function DashboardContainer() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 750,
        mx: "auto",
        mt: 4,
        px: { xs: 1.5, sm: 2 },
        py: 2,
        backgroundColor: "#f8fafc",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <ActiveGoalsList />

      <CompletedGoalsPreview />
    </Box>
  );
}
