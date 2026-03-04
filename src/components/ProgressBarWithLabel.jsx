import { Box, LinearProgress, Typography } from "@mui/material";

export default function ProgressBarWithLabel({ value }) {
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" mb={2} pt={1} >
                <Typography variant="body2">Progress</Typography>
                <Typography variant="body2">{Math.round(value)}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={value} sx={{ height: 9, borderRadius: 4}} />
        </Box>
    );
}