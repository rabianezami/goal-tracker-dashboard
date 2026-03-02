import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

export default function ProgressEntryDialog({
  open,
  onClose,
  onAdd,
}) {
  const [amount, setAmount] = useState(1);
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const handleSubmit = () => {
    onAdd({ amount: Number(amount), date });
    onClose();
    setAmount(1);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Progress</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}