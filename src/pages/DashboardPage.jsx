import { Container, Stack, Box } from "@mui/material"
import DashboardSummary from "../components/dashboard/DashboardSummary"
import CompletedGoalsPreview from "../components/dashboard/CompletedGoalsPreview"
import DashboardContainer from "../components/dashboard/DashboardContainer"
import ActiveGoalsList from "../components/dashboard/ActiveGoalLists"

export default function Dashboard() {
  return (
    <Container maxWidth="lg">

      <Stack spacing={3}>
        <DashboardSummary />
        <DashboardContainer>
          <ActiveGoalsList/>
          <CompletedGoalsPreview/>
        </DashboardContainer>
        <CompletedGoalsPreview />
      </Stack>

    </Container>
  )
}