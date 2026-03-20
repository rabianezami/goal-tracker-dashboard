import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography} from "@mui/material";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export default function Chart({goals = []}) {
    const { t } = useTranslation("categories");
    const isRTL = i18next.language === "fa";

    const filteredGoals = goals;
    const today = new Date();

    const earliestStart = new Date(
        Math.min(...filteredGoals.map(goal => new Date(goal.startDate)))
    );

    if (earliestStart > today) {
        return <Typography>Goal has not started yet</Typography>;
    }

    let allDates = [];
    let completedData = [];
    let uncompletedData = [];

    let current = new Date(earliestStart);

    while (current <= today) {
        allDates.push(new Date(current));
        completedData.push(0);
        uncompletedData.push(0);

        current.setDate(current.getDate() + 1);
    }

    filteredGoals.forEach((goal) => {
        const start = new Date(goal.startDate);

        allDates.forEach((date, index) => {
            if (date >= start && date <= today) {
                if (goal.progress >= goal.target) {
                    completedData[index] += 1;
                } else {
                    uncompletedData[index] += 1;
                }
            }
        });
    });
    const labels = allDates.map(date => date.getDate());


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
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: 2,
                    py: 0
                }}
            >
            </Box>
            
            <BarChart
                xAxis={[
                    {
                        id: "days",
                        data: labels,
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