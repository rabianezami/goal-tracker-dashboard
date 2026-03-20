import { Box, Container, Typography, Divider } from "@mui/material"
import { useTranslation } from "react-i18next"
import CategoryCard from "../../components/categories/CategoryCard";
import Chart from "../../components/categories/CategoryPageChart"

export default function Health() {
    const { t } = useTranslation("categories")

    const goals = (JSON.parse(localStorage.getItem("goals")) || [])
        .filter(goal => goal.goalCategory === "work");
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

    // const categoryName = ;

    return (
        <Container>
            <Box sx={{
                my: 2,
            }}>
                <Typography variant="h6">{t("titleCat", {cat: goals[0]?.goalCategory || "Work"})}</Typography>
            </Box>
            <Divider></Divider>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    // gap: 2,
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
            <Box>
                <Chart goals={goals} />
            </Box>
        </Container>
    )
}