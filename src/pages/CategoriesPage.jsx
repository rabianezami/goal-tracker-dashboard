import { Box, Container, Typography, Divider } from "@mui/material"
import { useTranslation } from "react-i18next"
import i18next from "i18next";
import CategoryCard from "../components/categories/CategoryCard";
import Chart from "../components/categories/CategoryPageChart"

export default function Categories () {

    const { t } = useTranslation("categories")
    const isRTL = i18next.language === "fa";

    const fakeGoals = [
        {id: 1, title: isRTL ? "صحتمندی" : "Health", total: 5, active: 3, completed: 2},
        {id: 2, title: isRTL ? "آموزشی" : "Study", total: 6, active: 2, completed: 4},
        {id: 3, title: isRTL ? "کار و تجارت" : "Business & Work", total: 4, active: 1, completed: 3},
        {id: 4, title: isRTL ? "شخصی" : "Personal", total: 7, active: 5, completed: 2},
    ]

    return(
        <Container>
            <Box sx={{
                my:2,
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
                    fakeGoals.map((goal) =>  (
                        <Box
                            key={goal.id}
                        >
                            <CategoryCard 
                                title={goal.title}
                                total={goal.total}
                                active={goal.active}
                                completed={goal.completed} 
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