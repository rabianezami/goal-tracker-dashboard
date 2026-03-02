import { Chip } from "@mui/material";

export default function StatusChip({ status }) {
  const statusMap = {
    active: { label: "Active", color: "success" },
    paused: { label: "Paused", color: "warning" },
    completed: { label: "Completed", color: "default" },
    canceled: { label: "Canceled", color: "error" },
  };

  const config = statusMap[status] || {
    label: status,
    color: "default",
  };

  return <Chip label={config.label} color={config.color} size="small" />;
}