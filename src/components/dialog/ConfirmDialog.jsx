import { useTranslation } from "react-i18next";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export default function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title,
}) {
    const { t } = useTranslation("goalList");

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t(title)}</DialogTitle>
            <DialogContent>
                <p>{t("confirmIncomplete")}</p>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    {t("no")}
                </Button>
                <Button onClick={onConfirm} variant="contained" color="primary">
                    {t("yes")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}