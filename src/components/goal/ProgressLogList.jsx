import { List, ListItem, ListItemText, Typography } from "@mui/material";

export default function ProgressLogList({ logs = [] }) {
  if (!logs.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        No progress entries yet.
      </Typography>
    );
  }

  return (
    <List dense>
      {logs.map((log, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={`+${log.amount}`}
            secondary={new Date(log.date).toLocaleDateString()}
          />
        </ListItem>
      ))}
    </List>
  );
}