import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function ProgressEntryDialog({
  open,
  onClose,
  onSubmit, // older name in your code
  onAdd,    // other possible prop name (we call both for compatibility)
}) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const [dateError, setDateError] = useState("");
  const [amountError, setAmountError] = useState("");

  const todayIso = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (open) {
      // reset and default date to today when opened
      setAmount("");
      setNote("");
      setDate(todayIso);
      setDateError("");
      setAmountError("");
    }
  }, [open, todayIso]);

  const validate = () => {
    let ok = true;
    setDateError("");
    setAmountError("");

    // date required and not future
    if (!date) {
      setDateError("لطفاً تاریخ را وارد کنید.");
      ok = false;
    } else if (date > todayIso) {
      setDateError("تاریخ نمی‌تواند بعد از امروز باشد.");
      ok = false;
    }

    // amount if provided must be > 0
    if (amount !== "" && Number(amount) <= 0) {
      setAmountError("مقدار باید عددی بزرگ‌تر از صفر باشد.");
      ok = false;
    }

    return ok;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const payload = {
      // if amount is empty string, send undefined so parent can decide for daily-type goals
      amount: amount === "" ? undefined : Number(amount),
      date,
      note: note?.trim() || "",
    };

    // Call both names for compatibility
    if (typeof onSubmit === "function") onSubmit(payload);
    if (typeof onAdd === "function") onAdd(payload);

    // cleanup and close
    setAmount("");
    setDate("");
    setNote("");
    setDateError("");
    setAmountError("");
    onClose();
  };

  return (
    <Dialog open={!!open} onClose={onClose}>
      <DialogTitle>ثبت پیشرفت</DialogTitle>

      <DialogContent sx={{ width: { xs: 300, sm: 420 } }}>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography variant="body2">مقدار (اختیاری برای اهداف روزانه)</Typography>
          <TextField
            label="مثال: 25"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            error={!!amountError}
            helperText={amountError || "عدد را بدون علامت وارد کنید"}
            inputProps={{ min: 0 }}
            aria-label="amount"
          />

          <Typography variant="body2">تاریخ ثبت</Typography>
          <TextField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            error={!!dateError}
            helperText={dateError || ""}
            InputLabelProps={{ shrink: true }}
            aria-label="date"
          />

          <Typography variant="body2">یادداشت (اختیاری)</Typography>
          <TextField
            label="شرح کوتاه"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            fullWidth
            multiline
            minRows={2}
            aria-label="note"
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>انصراف</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!date || !!dateError || !!amountError}
        >
          ثبت
        </Button>
      </DialogActions>
    </Dialog>
  );
}