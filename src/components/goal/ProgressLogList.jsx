import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ProgressLogList({ logs }) {
  const { t } = useTranslation("goalDetails");
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t("progressLog.history")}
        </Typography>

        <List sx={{ display: 'flex', flexDirection: 'column', gap: 2.2}}>
          {logs.length === 0 && (
            <Typography variant="body2">
              {t("progressLog.empty")}
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