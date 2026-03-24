import ActiveGoalsList from "./dashBoard/ActiveGoalLists"
import CompletedGoalsPreview from "./dashBoard/CompletedGoalsPreview"
import DashBoardSummary from "./dashBoard/DashBoardSummary"
import QuickActions from "./dashBoard/QuickActions"
export default function Dashboard() {
  return (
   <Box p={2}>
      <DashBoardSummary />

      <Box mt={2}>
        <QuickActions />
      </Box>

      <Box mt={3}>
        <ActiveGoalsList />
      </Box>

      <Box mt={3}>
        <CompletedGoalsPreview />
      </Box>
    </Box>
  )
}