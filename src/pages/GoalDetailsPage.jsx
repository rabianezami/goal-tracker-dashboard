// src/pages/GoalDetailsPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { Container, Stack } from "@mui/material";
import { useMemo, useState, useCallback } from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import GoalSummarySection from "../components/goal/GoalSummarySection";
import ProgressLogList from "../components/goal/ProgressLogList";
import ProgressEntryDialog from "../components/goal/ProgressEntryDialog";
import ConfirmDialog from "../components/dialog/ConfirmDialog";

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

  // ✅ confirm states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState(null);

  const { goals = [], updateGoal, markComplete } = useGoals();

  const goal = useMemo(
    () => goals?.find((g) => String(g.id) === String(id)) || null,
    [goals, id]
  );

  const { total, percent, isCompleted } = useGoalProgress(goal);

  const openConfirm = (type) => {
    setConfirmType(type);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (!goal) return;

    if (confirmType === "complete") {
      markComplete(goal.id);
      enqueueSnackbar(t("goal.completed"), { variant: "success" });
    }

    if (confirmType === "pause") {
      updateGoal(goal.id, { status: "paused" });
      enqueueSnackbar(t("enqueueSnackbar.goalPaused"), { variant: "info" });
    }

    if (confirmType === "resume") {
      updateGoal(goal.id, { status: "active" });
      enqueueSnackbar(t("enqueueSnackbar.goalResumed"), { variant: "info" });
    }

    setConfirmOpen(false);
    setConfirmType(null);
  };

  
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
        markComplete(goal.id);
        enqueueSnackbar(t("goal.completed"), { variant: "success" });
        setOpenDialog(false);
        return;
      }

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
        newTotal >= target
          ? t("goal.completedCongrats")
          : t("goal.progressAdded"),
        { variant: "success" }
      );

      setOpenDialog(false);
    },
    [goal, total, updateGoal, markComplete, enqueueSnackbar, t]
  );

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
          onComplete={() => openConfirm("complete")}
          onTogglePause={() =>
            openConfirm(goal.status === "paused" ? "resume" : "pause")
          }
        />

        <ProgressLogList logs={goal.logs || []} />
      </Stack>

      <ProgressEntryDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAdd={handleAddProgress}
        goalType={goal?.type}
      />

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="confirmIncompleteTitle"
      />
    </Container>
  );
}