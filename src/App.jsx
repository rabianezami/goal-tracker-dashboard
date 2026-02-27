
import AppThemeProvider from "./providers/AppThemeProvider"
import AppRoutes from "./routes/AppRoutes"
import "./i18n/index.js"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppThemeProvider>
          <AppRoutes />
        </AppThemeProvider>
      </LocalizationProvider>
    </>
  )
}

export default App
