import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function ProgressLogList({ logs }) {
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Progress History
        </Typography>

        <List>
          {logs.length === 0 && (
            <Typography variant="body2">
              No progress entries yet.
            </Typography>
          )}

          {logs.map((log) => (
            <ListItem key={log.id} divider>
              <ListItemText
                primary={`${log.amount}%`}
                secondary={new Date(log.date).toLocaleDateString()}
              />
              {log.note && (
                <Typography variant="body2" color="text.secondary">
                  {log.note}
                </Typography>
              )}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}