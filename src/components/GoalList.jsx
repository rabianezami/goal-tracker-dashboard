import { Box, Stack } from "@mui/material";
import GoalCard from "./GoalCard";

export default function GoalList({ goals }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        px: 2
      }}
    >
      <Stack spacing={2}>
        {goals.map((goal, index) => (
          <GoalCard key={index} goal={goal} />
        ))}
      </Stack>
    </Box>
  );
}