import { Box, Container, Typography, Divider } from "@mui/material"
import { useTranslation } from "react-i18next"
import CategoryCard from "../components/categories/CategoryCard";
import Chart from "../components/categories/CategoryPageChart"

export default function Categories() {
    const { t } = useTranslation("categories")

    const goals = JSON.parse(localStorage.getItem("goals")) || [];
    const categoryStats = {};

    goals.forEach((goal) => {
        const category = goal.goalCategory;

        if (!categoryStats[category]) {
            categoryStats[category] = {
                title: category,
                total: 0,
                active: 0,
                completed: 0
            };
        }

        categoryStats[category].total += 1;

        if (goal.status === "active") {
            categoryStats[category].active += 1;
        }

        if (goal.status === "completed") {
            categoryStats[category].completed += 1;
        }
    });

    const categories = Object.values(categoryStats);

    return (
        <Container>
            <Box sx={{
                my: 2,
            }}>
                <Typography variant="h6">{t("title")}</Typography>
            </Box>
            <Divider></Divider>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    columnGap: 2,
                    my: 4
                }}
            >
                {
                    categories.map((category) => (
                        <Box
                            key={category.title}
                        >
                            <CategoryCard
                                title={category.title}
                                total={category.total}
                                active={category.active}
                                completed={category.completed}
                            />
                        </Box>

                    ))
                }
            </Box>
            <Box
                sx={{
                    mx: 0
                }}
            >
                <Chart></Chart>
            </Box>
        </Container>
    )
}