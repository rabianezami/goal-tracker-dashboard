// src/pages/GoalDetailsPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import GoalSummarySection from "../components/goal/GoalSummarySection";
import ProgressLogList from "../components/goal/ProgressLogList";
import ProgressEntryDialog from "../components/goal/ProgressEntryDialog";
import {
  getGoalsFromStorage,
  saveGoalsToStorage,
  updateGoalInStorage,
} from "../components/utils/goalStorage";

// small seed used only when localStorage empty (dev convenience)
const seedGoals = [
  {
    id: "1",
    title: "Learn React",
    description: "Complete React course and build 3 projects",
    target: 100,
    type: "count", // "daily" | "count" | "time"
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

  const [goal, setGoal] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Load goal from localStorage; seed if empty (dev)
  useEffect(() => {
    const stored = getGoalsFromStorage();
    if (!stored || stored.length === 0) {
      saveGoalsToStorage(seedGoals);
      const found = seedGoals.find((g) => String(g.id) === String(id));
      setGoal(found || null);
      return;
    }
    const found = stored.find((g) => String(g.id) === String(id));
    setGoal(found || null);
  }, [id]);

  // If not found show simple fallback
  if (!goal) return <Container sx={{ py: 6 }}>Goal not found</Container>;

  // Compute totals depending on type
  const computeTotalProgress = (g) => {
    if (!g) return 0;
    if (g.type === "daily") {
      const uniq = new Set((g.logs || []).map((l) => normalizeDateInput(l.date)));
      uniq.delete(null); // remove invalid
      return uniq.size;
    }
    // count / time
    return (g.logs || []).reduce((s, l) => s + Number(l.amount || 0), 0);
  };

  const totalProgress = computeTotalProgress(goal);
  const cappedTotal = Math.min(totalProgress, Number(goal.target || 0));
  const progressPercent = goal.target ? (cappedTotal / goal.target) * 100 : 0;
  const progressPercentClamped = Math.round(Math.min(100, progressPercent));

  // Persist helper: update storage and refresh local state from storage
  const persistUpdatedGoal = (updated) => {
    // sort logs newest-first by iso date
    const withSortedLogs = {
      ...updated,
      logs: (updated.logs || []).slice().sort((a, b) => {
        const da = normalizeDateInput(a.date) || "";
        const db = normalizeDateInput(b.date) || "";
        return db.localeCompare(da);
      }),
    };

    // Update storage (uses utils/updateGoalInStorage)
    updateGoalInStorage(withSortedLogs);

    // Reload from storage to ensure canonical state
    const refreshed = getGoalsFromStorage().find((g) => String(g.id) === String(withSortedLogs.id));
    setGoal(refreshed || withSortedLogs);
  };

  // Handler when user clicks Add Progress button
  const handleAddClick = () => {
    if (goal.status === "completed" || progressPercentClamped >= 100) {
      enqueueSnackbar("این هدف قبلاً کامل شده و قابل ثبت پیشرفت نیست.", { variant: "info" });
      return;
    }
    if (goal.status === "paused") {
      enqueueSnackbar("این هدف در وضعیت متوقف است — ابتدا آن را از حالت متوقف خارج کنید.", { variant: "warning" });
      return;
    }
    setOpenDialog(true);
  };

  // Add (submit) progress from dialog
  const handleAddProgress = (data) => {
    // data: { amount, date, note }
    if (!data) {
      enqueueSnackbar("اطلاعاتی دریافت نشد.", { variant: "error" });
      return;
    }

    // Validate amount
    const rawAmount = Number(data.amount || 0);
    if (goal.type !== "daily" && (!rawAmount || rawAmount <= 0)) {
      enqueueSnackbar("لطفاً مقدار معتبر وارد کنید.", { variant: "error" });
      return;
    }

    // Normalize date
    const isoDate = normalizeDateInput(data.date);
    if (!isoDate) {
      enqueueSnackbar("تاریخ نامعتبر است.", { variant: "error" });
      return;
    }

    // Disallow future dates
    const todayIso = new Date().toISOString().slice(0, 10);
    if (isoDate > todayIso) {
      enqueueSnackbar("تاریخ آینده قابل پذیرش نیست.", { variant: "error" });
      return;
    }

    // If already completed
    if (goal.status === "completed") {
      enqueueSnackbar("این هدف قبلاً تکمیل شده و قابل ثبت پیشرفت نیست.", { variant: "info" });
      setOpenDialog(false);
      return;
    }

    const currentTotal = computeTotalProgress(goal);
    const target = Number(goal.target || 0);
    const allowed = Math.max(0, target - currentTotal);

    if (allowed <= 0) {
      const updatedGoal = { ...goal, status: "completed" };
      persistUpdatedGoal(updatedGoal);
      enqueueSnackbar("هدف به حد کامل رسیده است.", { variant: "success" });
      setOpenDialog(false);
      return;
    }

    // For daily goals: amount is 1 per unique date; if already logged for that date -> notify and don't increase
    if (goal.type === "daily") {
      const exists = (goal.logs || []).some((l) => normalizeDateInput(l.date) === isoDate);
      if (exists) {
        enqueueSnackbar("برای این تاریخ قبلاً ثبت انجام شده است.", { variant: "info" });
        setOpenDialog(false);
        return;
      }
      // add one day entry
      const newLog = {
        id: Date.now().toString(),
        amount: 1,
        note: data.note ?? "",
        date: isoDate,
      };
      const updatedGoal = { ...goal, logs: [...(goal.logs || []), newLog] };
      // mark complete if reached
      const newTotal = computeTotalProgress(updatedGoal);
      if (newTotal >= target) updatedGoal.status = "completed";
      persistUpdatedGoal(updatedGoal);
      enqueueSnackbar(newTotal >= target ? "تبریک! هدف تکمیل شد." : "ثبت انجام شد.", { variant: "success" });
      setOpenDialog(false);
      return;
    }

    // For count/time goals: merge same-date logs by summing amounts
    let amountToAdd = rawAmount;
    if (amountToAdd > allowed) {
      amountToAdd = allowed;
      enqueueSnackbar(`مقدار ورودی به ${allowed} کاهش یافت تا از هدف عبور نکند.`, { variant: "info" });
    }

    const existingLogs = (goal.logs || []).slice();
    const idx = existingLogs.findIndex((l) => normalizeDateInput(l.date) === isoDate);
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
    const newTotal = computeTotalProgress(updatedGoal);
    if (newTotal >= target) {
      updatedGoal.status = "completed";
      enqueueSnackbar("تبریک! هدف تکمیل شد.", { variant: "success" });
    } else {
      enqueueSnackbar("پیشرفت اضافه شد.", { variant: "success" });
    }

    persistUpdatedGoal(updatedGoal);
    setOpenDialog(false);
  };

  const handleMarkComplete = () => {
    if (progressPercentClamped >= 100) {
      const updated = { ...goal, status: "completed" };
      persistUpdatedGoal(updated);
      enqueueSnackbar("هدف با موفقیت تکمیل شد.", { variant: "success" });
    } else {
      enqueueSnackbar("برای تکمیل دستی، پیشرفت باید به 100٪ برسد.", { variant: "warning" });
    }
  };

  const handlePauseResume = () => {
    const updated = { ...goal, status: goal.status === "paused" ? "active" : "paused" };
    persistUpdatedGoal(updated);
    enqueueSnackbar(`وضعیت به ${updated.status} تغییر کرد.`, { variant: "info" });
  };

  const handleEdit = () => {
    navigate(`/goals/${id}/edit`);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3}>
        <GoalSummarySection
          goal={goal}
          progressPercent={progressPercentClamped}
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