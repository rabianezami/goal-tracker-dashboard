import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function StatusChip({ status }) {
  const { t } = useTranslation("goalDetails");
  const statusMap = {
    active: { label: t("status.active"), color: "success" },
    paused: { label: t("status.paused"), color: "warning" },
    completed: { label: t("status.completed"), color: "secondary" },
  };

  const config = statusMap[status] || {
    label: status,
    color: "default",
  };

  return <Chip label={config.label} color={config.color} sx={{ padding: "1rem", fontSize: "1.2rem" }} />;
}