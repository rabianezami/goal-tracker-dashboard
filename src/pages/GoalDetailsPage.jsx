// src/pages/GoalDetailsPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { Container, Stack } from "@mui/material";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import GoalSummarySection from "../components/goal/GoalSummarySection";
import ProgressLogList from "../components/goal/ProgressLogList";
import ProgressEntryDialog from "../components/goal/ProgressEntryDialog";
import {
  getGoalsFromStorage,
  saveGoalsToStorage,
  updateGoalInStorage,
} from "../components/utils/goalStorage";

import useGoalProgress from "../hooks/useGoalProgress";

// small seed used only when localStorage empty (dev convenience)
const seedGoals = [
  {
    id: "1",
    title: "Learn React",
    description: "Complete React course and build 3 projects",
    target: 100,
    type: "count",
    status: "active",
    createdAt: new Date().toISOString(),
    logs: [
      { id: "l1", amount: 20, note: "Finished Hooks", date: "2024-01-15" },
      { id: "l2", amount: 30, note: "Built small project", date: "2024-01-16" },
    ],
  },
];

function normalizeDateInput(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

export default function GoalDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("goalDetails");

  const [version, setVersion] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  // Seed goals if storage is empty
  useEffect(() => {
    const stored = getGoalsFromStorage();
    if (!stored || stored.length === 0) {
      saveGoalsToStorage(seedGoals);
    }
  }, []);

  // Compute goal based on id and version
  const goal = useMemo(() => {
    const stored = getGoalsFromStorage();
    return stored?.find((g) => String(g.id) === String(id)) || null;
  }, [id, version]);

  // ✅ use custom hook instead of manual progress calculation
  const { total, percent, isCompleted } = useGoalProgress(goal);

  const updateGoal = useCallback((updated) => {
    const withSortedLogs = {
      ...updated,
      logs: (updated.logs || []).slice().sort((a, b) => {
        const da = normalizeDateInput(a.date) || "";
        const db = normalizeDateInput(b.date) || "";
        return db.localeCompare(da);
      }),
    };

    updateGoalInStorage(withSortedLogs);
    setVersion((v) => v + 1);
  }, []);

  if (!goal) return <Container sx={{ py: 6 }}>Goal not found</Container>;

  const handleAddClick = () => {
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
  };

  const handleAddProgress = (data) => {
    const isoDate = normalizeDateInput(data.date);
    const currentTotal = total;
    const target = Number(goal.target || 0);

    const allowed = Math.max(0, target - currentTotal);

    if (allowed <= 0) {
      const updatedGoal = { ...goal, status: "completed" };
      updateGoal(updatedGoal);
      enqueueSnackbar(t("goal.completed"), { variant: "success" });
      setOpenDialog(false);
      return;
    }

    // DAILY GOAL
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

      const updatedGoal = {
        ...goal,
        logs: [...(goal.logs || []), newLog],
      };

      const newTotal = currentTotal + 1;

      if (newTotal >= target) updatedGoal.status = "completed";

      updateGoal(updatedGoal);

      enqueueSnackbar(
        newTotal >= target
          ? t("goal.completedCongrats")
          : t("goal.progressAdded"),
        { variant: "success" }
      );

      setOpenDialog(false);
      return;
    }

    // COUNT / OTHER TYPES
    let amountToAdd = Number(data.amount);
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

    const updatedGoal = { ...goal, logs: newLogs };

    const newTotal = currentTotal + amountToAdd;

    if (newTotal >= target) {
      updatedGoal.status = "completed";
      enqueueSnackbar(t("goal.completedCongrats"), { variant: "success" });
    } else {
      enqueueSnackbar(t("goal.progressAdded"), { variant: "success" });
    }

    updateGoal(updatedGoal);
    setOpenDialog(false);
  };

  const handleMarkComplete = () => {
    if (isCompleted) {
      const updated = { ...goal, status: "completed" };
      updateGoal(updated);
      enqueueSnackbar("هدف با موفقیت تکمیل شد.", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(t("enqueueSnackbar.goalCantComplete"), {
        variant: "warning",
      });
    }
  };

  const handlePauseResume = () => {
    const updated = {
      ...goal,
      status: goal.status === "paused" ? "active" : "paused",
    };

    updateGoal(updated);

    enqueueSnackbar(
      t(
        `enqueueSnackbar.goal${
          updated.status === "paused" ? "Paused" : "Resumed"
        }`
      ),
      {
        variant: "info",
      }
    );
  };

  const handleEdit = () => {
    navigate(`/goals/${id}/edit`);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3}>
        <GoalSummarySection
          goal={goal}
          progressPercent={percent} // ✅ from hook
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
        onSubmit={handleAddProgress}
      />
    </Container>
  );
}
