import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function DeleteConfirmDialog({ open, onClose, onConfirm }) {
  const {t} = useTranslation("deleteConfirm")
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("title")}</DialogTitle>

      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button color="error" onClick={onConfirm}>
         {t("confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}