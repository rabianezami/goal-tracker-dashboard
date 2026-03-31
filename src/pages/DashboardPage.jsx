import { Container, Stack } from "@mui/material"
import DashboardSummary from "../components/dashboard/DashBoardSummary"
import ActiveGoalsList from "../components/dashboard/ActiveGoalLists"
import CompletedGoalsPreview from "../components/dashboard/CompletedGoalsPreview"

export default function Dashboard() {
  return (
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <DashboardSummary />
        <ActiveGoalsList />
        <CompletedGoalsPreview />
      </Stack>
    </Container>
  )
}