import { Box } from "@mui/material";
export default function DashboardContainer({ children }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 750,
        mx: "auto",
        mt: 4,
        px: { xs: 1.5, sm: 2 },
        py: 2,
        backgroundColor: "theme.main",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        borderRadius: 1,
      }}
    >
      {children}
    </Box>
  );
}
