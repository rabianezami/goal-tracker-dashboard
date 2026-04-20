import { Box, Container, Typography, Divider, Paper } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import Chart from "./CategoryPageChart";

export default function CategoryPage() {
    const { t } = useTranslation("categories");
    const { categoryName } = useParams();

    const goals = (JSON.parse(localStorage.getItem("goals")) || [])
        .filter(goal => goal.goalCategory === categoryName);

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

            <Box sx={{ my: 3, textAlign: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {t("titleCat", { cat: t(`categoriesName.${categoryName}`) })}
                </Typography>
            </Box>

            <Divider />

            {categories.length === 0 ? (
                <Paper
                    elevation={0}
                    sx={{
                        mt: 8,
                        p: 5,
                        textAlign: "center",
                        backgroundColor: "background.paper",
                    }}
                >
                    <InboxIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />

                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {t("noGoals")}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {t("description")}
                    </Typography>
                </Paper>
            ) : (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: 3,
                        my: 4
                    }}
                >
                    {categories.map((category, index) => (
                        <Box
                            key={`${category.title}-${index}`}
                            sx={{
                                transition: "0.3s",
                                "&:hover": {
                                    transform: "translateY(-6px)",
                                    boxShadow: 3
                                }
                            }}
                        >
                            <CategoryCard
                                title={t(`categoriesName.${category.title}`)}
                                total={category.total}
                                active={category.active}
                                completed={category.completed}
                            />
                        </Box>
                    ))}
                </Box>
            )}

            {goals.length > 0 && (
                <Box sx={{ mt: 6 }}>
                    <Chart goals={goals} />
                </Box>
            )}

        </Container>
    );
}