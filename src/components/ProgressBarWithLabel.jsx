import { Box, LinearProgress, Typography } from "@mui/material";

export default function ProgressBarWithLabel({ value }) {
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Typography variant="body2">Progress</Typography>
                <Typography variant="body2">{Math.round(value)}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={value} />
        </Box>
    );
}