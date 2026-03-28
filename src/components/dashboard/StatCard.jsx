import { Card, CardContent, Typography, Box } from "@mui/material";

export default function StatCard({ title, value, icon, color }) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          {icon}
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
        </Box>

        <Typography variant="h5" fontWeight="bold" mt={1} color={color}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}