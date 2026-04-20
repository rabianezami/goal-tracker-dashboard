import { Container, Stack, Box } from "@mui/material";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import CompletedGoalsPreview from "../components/dashboard/CompletedGoalsPreview";
import DashboardContainer from "../components/dashboard/DashboardContainer";
import ActiveGoalsList from "../components/dashboard/ActiveGoalLists";
import { useUserStats } from "../hooks/useUserStats";

export default function Dashboard() {
  const stats = useUserStats();

  return (
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <DashboardSummary stats={stats} />
        <DashboardContainer>
          <ActiveGoalsList />
          <CompletedGoalsPreview />
        </DashboardContainer>
      </Stack>
    </Container>
  );
}
