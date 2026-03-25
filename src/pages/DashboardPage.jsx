import { Container, Stack } from "@mui/material"
import DashboardSummary from "../components/dashboard/DashboardSummary"
import QuickActions from "../components/dashboard/QuickActions"
import ActiveGoalsList from "../components/dashboard/ActiveGoalLists"
import CompletedGoalsPreview from "../components/dashboard/CompletedGoalsPreview"

export default function Dashboard() {
  return (
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <DashboardSummary />
        <QuickActions />
        <ActiveGoalsList />
        <CompletedGoalsPreview />
      </Stack>
    </Container>
  )
}