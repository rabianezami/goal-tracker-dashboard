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

import useGoalProgress from "../validations/useGoalProgress";

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

  const [goal, setGoal] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Load goal
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

  // ✅ use custom hook instead of manual progress calculation
  const { total, percent, isCompleted } = useGoalProgress(goal);

  if (!goal) return <Container sx={{ py: 6 }}>Goal not found</Container>;

  const persistUpdatedGoal = (updated) => {
    const withSortedLogs = {
      ...updated,
      logs: (updated.logs || []).slice().sort((a, b) => {
        const da = normalizeDateInput(a.date) || "";
        const db = normalizeDateInput(b.date) || "";
        return db.localeCompare(da);
      }),
    };

    updateGoalInStorage(withSortedLogs);

    const refreshed = getGoalsFromStorage().find(
      (g) => String(g.id) === String(withSortedLogs.id),
    );

    setGoal(refreshed || withSortedLogs);
  };

  const handleAddClick = () => {
    if (goal.status === "completed" || isCompleted) {
      enqueueSnackbar("این هدف قبلاً کامل شده و قابل ثبت پیشرفت نیست.", {
        variant: "info",
      });
      return;
    }

    if (goal.status === "paused") {
      enqueueSnackbar(
        "این هدف در وضعیت متوقف است — ابتدا آن را از حالت متوقف خارج کنید.",
        { variant: "warning" },
      );
      return;
    }

    setOpenDialog(true);
  };

  const handleAddProgress = (data) => {
    if (!data) {
      enqueueSnackbar("اطلاعاتی دریافت نشد.", { variant: "error" });
      return;
    }

    const rawAmount = Number(data.amount || 0);
    if (goal.type !== "daily" && (!rawAmount || rawAmount <= 0)) {
      enqueueSnackbar("لطفاً مقدار معتبر وارد کنید.", { variant: "error" });
      return;
    }

    const isoDate = normalizeDateInput(data.date);
    if (!isoDate) {
      enqueueSnackbar("تاریخ نامعتبر است.", { variant: "error" });
      return;
    }

    const todayIso = new Date().toISOString().slice(0, 10);
    if (isoDate > todayIso) {
      enqueueSnackbar("تاریخ آینده قابل پذیرش نیست.", {
        variant: "error",
      });
      return;
    }

    if (goal.status === "completed") {
      enqueueSnackbar("این هدف قبلاً تکمیل شده و قابل ثبت پیشرفت نیست.", {
        variant: "info",
      });
      setOpenDialog(false);
      return;
    }

    const currentTotal = total; // ✅ from hook
    const target = Number(goal.target || 0);
    const allowed = Math.max(0, target - currentTotal);

    if (allowed <= 0) {
      const updatedGoal = { ...goal, status: "completed" };
      persistUpdatedGoal(updatedGoal);
      enqueueSnackbar("هدف به حد کامل رسیده است.", {
        variant: "success",
      });
      setOpenDialog(false);
      return;
    }

    if (goal.type === "daily") {
      const exists = (goal.logs || []).some(
        (l) => normalizeDateInput(l.date) === isoDate,
      );

      if (exists) {
        enqueueSnackbar("برای این تاریخ قبلاً ثبت انجام شده است.", {
          variant: "info",
        });
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

      persistUpdatedGoal(updatedGoal);

      enqueueSnackbar(
        newTotal >= target ? "تبریک! هدف تکمیل شد." : "ثبت انجام شد.",
        { variant: "success" },
      );

      setOpenDialog(false);
      return;
    }

    let amountToAdd = rawAmount;

    if (amountToAdd > allowed) {
      amountToAdd = allowed;
      enqueueSnackbar(
        `مقدار ورودی به ${allowed} کاهش یافت تا از هدف عبور نکند.`,
        { variant: "info" },
      );
    }

    const existingLogs = (goal.logs || []).slice();
    const idx = existingLogs.findIndex(
      (l) => normalizeDateInput(l.date) === isoDate,
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
      enqueueSnackbar("تبریک! هدف تکمیل شد.", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("پیشرفت اضافه شد.", {
        variant: "success",
      });
    }

    persistUpdatedGoal(updatedGoal);
    setOpenDialog(false);
  };

  const handleMarkComplete = () => {
    if (isCompleted) {
      const updated = { ...goal, status: "completed" };
      persistUpdatedGoal(updated);
      enqueueSnackbar("هدف با موفقیت تکمیل شد.", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("برای تکمیل دستی، پیشرفت باید به 100٪ برسد.", {
        variant: "warning",
      });
    }
  };

  const handlePauseResume = () => {
    const updated = {
      ...goal,
      status: goal.status === "paused" ? "active" : "paused",
    };

    persistUpdatedGoal(updated);

    enqueueSnackbar(`وضعیت به ${updated.status} تغییر کرد.`, {
      variant: "info",
    });
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
