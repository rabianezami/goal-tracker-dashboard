// src/pages/GoalDetailsPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { Container, Stack } from "@mui/material";
import { useMemo, useState, useCallback } from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import GoalSummarySection from "../components/goal/GoalSummarySection";
import ProgressLogList from "../components/goal/ProgressLogList";
import ProgressEntryDialog from "../components/goal/ProgressEntryDialog";

import { useGoals } from "../context/GoalsContext";

import useGoalProgress from "../hooks/useGoalProgress";

function normalizeDateInput(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function sortLogsDesc(logs = []) {
  return (logs || [])
    .slice()
    .sort((a, b) => {
      const da = normalizeDateInput(a.date) || "";
      const db = normalizeDateInput(b.date) || "";
      return db.localeCompare(da);
    });
}

export default function GoalDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("goalDetails");

  const [openDialog, setOpenDialog] = useState(false);

  // context
  const { goals = [], updateGoal, markComplete } = useGoals();

  // find goal from context (recomputes when goals or id change)
  const goal = useMemo(
    () => goals?.find((g) => String(g.id) === String(id)) || null,
    [goals, id]
  );

  // progress info from custom hook
  const { total, percent, isCompleted } = useGoalProgress(goal);

  const handleAddClick = useCallback(() => {
    if (!goal) return;

    if (goal.status === "completed" || isCompleted) {
      enqueueSnackbar(t("enqueueSnackbar.goalHadCompleted"), {
        variant: "info",
      });
      return;
    }

    if (goal.status === "paused") {
      enqueueSnackbar(t("enqueueSnackbar.goalPaused"), { variant: "warning" });
      return;
    }

    setOpenDialog(true);
  }, [goal, isCompleted, enqueueSnackbar, t]);

  const handleAddProgress = useCallback(
    (data) => {
      if (!goal) return;

      const isoDate = normalizeDateInput(data.date);
      const currentTotal = total;
      const target = Number(goal.target || 0);
      const allowed = Math.max(0, target - currentTotal);

      if (allowed <= 0) {
        // already complete
        markComplete(goal.id);
        enqueueSnackbar(t("goal.completed"), { variant: "success" });
        setOpenDialog(false);
        return;
      }

      // DAILY goal: one log per day
      if (goal.type === "daily") {
        const exists = (goal.logs || []).some(
          (l) => normalizeDateInput(l.date) === isoDate
        );

        if (exists) {
          enqueueSnackbar(t("goal.alreadyLogged"), { variant: "info" });
          setOpenDialog(false);
          return;
        }

        const newLog = {
          id: Date.now().toString(),
          amount: 1,
          note: data.note ?? "",
          date: isoDate,
        };

        const updatedLogs = [...(goal.logs || []), newLog];
        const newTotal = currentTotal + 1;

        const updatedGoal = {
          ...goal,
          logs: sortLogsDesc(updatedLogs),
          status: newTotal >= target ? "completed" : goal.status,
        };

        updateGoal(goal.id, updatedGoal);

        enqueueSnackbar(
          newTotal >= target ? t("goal.completedCongrats") : t("goal.progressAdded"),
          { variant: "success" }
        );

        setOpenDialog(false);
        return;
      }

      // COUNT / other types
      let amountToAdd = Number(data.amount);
      if (Number.isNaN(amountToAdd) || amountToAdd <= 0) amountToAdd = 0;
      if (amountToAdd > allowed) amountToAdd = allowed;

      const existingLogs = (goal.logs || []).slice();
      const idx = existingLogs.findIndex(
        (l) => normalizeDateInput(l.date) === isoDate
      );

      let newLogs;
      if (idx >= 0) {
        const existing = { ...existingLogs[idx] };
        existing.amount = Number(existing.amount || 0) + amountToAdd;
        existing.note = data.note ?? existing.note;
        existingLogs[idx] = existing;
        newLogs = existingLogs;
      } else {
        const newLog = {
          id: Date.now().toString(),
          amount: amountToAdd,
          note: data.note ?? "",
          date: isoDate,
        };
        newLogs = [...existingLogs, newLog];
      }

      const newTotal = currentTotal + amountToAdd;
     const updatedData = {
        logs: sortLogsDesc(newLogs),
        progress: newTotal,
        status: newTotal >= target ? "completed" : goal.status,
      };


      updateGoal(goal.id, updatedData);

      enqueueSnackbar(
        newTotal >= target ? t("goal.completedCongrats") : t("goal.progressAdded"),
        { variant: "success" }
      );

      setOpenDialog(false);
    },
    [goal, total, updateGoal, markComplete, enqueueSnackbar, t]
  );

  const handleMarkComplete = useCallback(() => {
    if (!goal) return;
    // use context action
    markComplete(goal.id);
    enqueueSnackbar(t("goal.completed"), { variant: "success" });
  }, [goal, markComplete, enqueueSnackbar, t]);

  const handlePauseResume = useCallback(() => {
    if (!goal) return;
    const newStatus = goal.status === "paused" ? "active" : "paused";
    // updateGoal accepts (id, updatedData)
    updateGoal(goal.id, { status: newStatus });
    enqueueSnackbar(
      t(`enqueueSnackbar.goal${newStatus === "paused" ? "Paused" : "Resumed"}`),
      { variant: "info" }
    );
  }, [goal, updateGoal, enqueueSnackbar, t]);

  const handleEdit = useCallback(() => {
    navigate(`/goals/${id}/edit`);
  }, [navigate, id]);

  if (!goal) {
    return <Container sx={{ py: 6 }}>Goal not found</Container>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3}>
        <GoalSummarySection
          goal={goal}
          progressPercent={percent}
          onAdd={handleAddClick}
          onEdit={handleEdit}
          onComplete={handleMarkComplete}
          onTogglePause={handlePauseResume}
        />

        <ProgressLogList logs={goal.logs || []} />
      </Stack>

      <ProgressEntryDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAdd={handleAddProgress}
        goalType={goal?.type}
      />
    </Container>
  );
}