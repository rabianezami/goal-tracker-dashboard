import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export default function Chart({}) {
    const {t} = useTranslation("categories")
    const isRTL = i18next.language === "fa";

    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // in here I used to randomize both completed and uncompleted goals, later we can make it dynamic coming from localStorage
    const completedData = Array.from({ length: daysInMonth }, () =>
        Math.floor(Math.random() * 5)
    );

    const uncompletedData = completedData.map((completed) =>
        Math.floor(Math.random() * (5 - completed))
    );

    return (
        <Box
            sx={{
                mx: 0
            }}
        >
            <Typography
                sx={{
                    color: "primary.light",
                    textAlign: "center",
                    my: 2
                }}
                variant="h4"
            >
                {t("chart.title")}
            </Typography>
            <BarChart
                xAxis={[
                    {
                        id: "days",
                        data: dates,
                        label: isRTL ? "روزهای ماه" : "Days Of Month",
                        scaleType: "band",
                    }
                ]}
                series={[
                    {
                        data: completedData,
                        label: isRTL ? "تکمیل شده" : "Completed",
                        stack: "goals",
                        color: "#4a90e2"
                    },
                    {
                        data: uncompletedData,
                        label: isRTL ? "تکمیل نشده" : "Uncompleted",
                        stack: "goals",
                        color: "#f59e0b"
                    }
                ]}
                height={300}
                sx={{
                    mx: 0
                }}
                margin={{ left: 0, right: 0, top: 20, bottom: 30 }}
                yAxis={[
                    {
                        label: isRTL ? "اهداف" :"Goals"
                    }
                ]}
                colors={["#4a90e2"]}
                borderRadius={[6]}
            />
        </Box>
        
    );
}