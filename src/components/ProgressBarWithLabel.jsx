import { Box, LinearProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ProgressBarWithLabel({ value }) {
    const { t } = useTranslation("goalDetails");
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" mb={2} pt={1} >
                <Typography variant="body1">{t("progressLog.title")}</Typography>
                <Typography variant="body1">{Math.round(value)}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={value} sx={{ height: 9, borderRadius: 4}} />
        </Box>
    );
}