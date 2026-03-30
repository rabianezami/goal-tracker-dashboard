import { Container, Stack, Box } from "@mui/material"
import DashboardSummary from "../components/dashboard/DashboardSummary"
import QuickActions from "../components/dashboard/QuickActions"
import ActiveGoalsList from "../components/dashboard/ActiveGoalLists"
import CompletedGoalsPreview from "../components/dashboard/CompletedGoalsPreview"

export default function Dashboard() {
  return (
    <Container maxWidth="lg">

      <Box
        display="flex"
        gap={2}
        alignItems="stretch"
        flexWrap="wrap"
        mb={3}
      >
     
        <Box flex={1} minWidth="320px">
          <QuickActions />
        </Box>

        <Box flex={1} minWidth="320px">
          <DashboardSummary />
        </Box>
      </Box>

      <Stack spacing={3}>
        <ActiveGoalsList />
        <CompletedGoalsPreview />
      </Stack>

    </Container>
  )
}