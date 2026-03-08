import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography, FormControl, InputLabel, Select, MenuItem,   } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import i18next from "i18next";

export default function Chart({}) {
    const {t} = useTranslation("categories")
    const isRTL = i18next.language === "fa";

    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    const categories = [...new Set(storedGoals.map(goal => goal.goalCategory))];

    const [selectedCategory, setSelectedCategory] = useState(categories[0] || "");

    const filteredGoals = storedGoals.filter(
        goal => goal.goalCategory === selectedCategory
    );

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const completedData = Array(daysInMonth).fill(0);
    const uncompletedData = Array(daysInMonth).fill(0);

    filteredGoals.forEach((goal) => {
        const start = new Date(goal.startDate);
        const end = new Date(goal.endDate);

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDay = new Date(year, month, day);

            if (currentDay >= start && currentDay <= end) {
            const index = day - 1;

            if (goal.progress >= goal.target) {
                completedData[index] += 1;
            } else {
                uncompletedData[index] += 1;
            }
            }
        }
    });

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
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={selectedCategory}
                        label="Category"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            
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