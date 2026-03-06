import { Container, Box, Divider, Typography, LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next"

export default function CategoryCard ({title, total, active, completed}) {

    const progress = total === 0 ? 0 : (completed / total) * 100;

    const {t} = useTranslation("categories")

    return (
        <Container
            sx={{
                my:2,
                border: 1, 
                borderRadius: 0.5,
                borderColor: "#d1d5db",
                boxShadow: 1,
                p: 2,
                maxWidth: {
                    lg: 400,
                },
            }}
        >
            <Box sx={{
                color: "primary.light",
                fontSize: 25,
                my: 1
            }}>
                {title}
            </Box>
            <Divider></Divider>
            <Box 
                sx={{
                    my: 1,
                }}  
            >
                <Typography>
                    {t("list.total", {total: total})}
                </Typography>
                <Typography>
                    {t("list.active", {active: active})}
                </Typography>
                <Typography>
                    {t("list.completed", {completed: completed})}
                </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
                <LinearProgress 
                    variant="determinate" 
                    value={progress} 
                    sx={{
                        mt: 2,
                        backgroundColor: "primary.light",
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: "#F59E0B"
                        }
                    }} 
                />

                <Typography 
                    variant="caption"
                >
                    {t("list.completionPercentage", {percent: Math.round(progress)})}
                </Typography>
            </Box>
        </Container>
    )
}