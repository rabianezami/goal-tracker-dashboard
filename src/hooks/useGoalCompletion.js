
export default function useGoalCompletion() {

  function checkCompletion(goal) {
    if (!goal) return goal;

    const { progress = 0, target = 0, status } = goal;

    if (status !== "completed" && target > 0 && progress >= target) {
      return { ...goal, status: "completed" };
    }

    return goal;
  }

  return { checkCompletion };
}