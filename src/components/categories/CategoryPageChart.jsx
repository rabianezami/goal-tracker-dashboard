import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography} from "@mui/material";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import calculateChartData from "../../hooks/calculateChartData";

export default function Chart({ goals = [] }) {
    const { t } = useTranslation("categories");
    const isRTL = i18next.language === "fa";

    const chartData = calculateChartData(goals);

    if (!chartData) {
        return <Typography>No goals available</Typography>;
    }

    if (chartData === "not-started") {
        return <Typography>Goal has not started yet</Typography>;
    }

    return (
        <Box>
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
                        data: chartData.labels,
                        label: isRTL ? "روزهای ماه" : "Days Of Month",
                        scaleType: "band",
                    }
                ]}
                series={[
                    {
                        data: chartData.completedData,
                        label: isRTL ? "تکمیل شده" : "Completed",
                        stack: "goals",
                        color: "#4a90e2"
                    },
                    {
                        data: chartData.uncompletedData,
                        label: isRTL ? "تکمیل نشده" : "Uncompleted",
                        stack: "goals",
                        color: "#f59e0b"
                    }
                ]}
                height={300}
                margin={{ left: 0, right: 0, top: 20, bottom: 30 }}
                yAxis={[
                    {
                        label: isRTL ? "اهداف" :"Goals"
                    }
                ]}
                borderRadius={[6]}
            />
        </Box>
    );
}