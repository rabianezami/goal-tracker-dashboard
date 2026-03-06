
import AppThemeProvider from "./providers/AppThemeProvider"
import AppRoutes from "./routes/AppRoutes"
import "./index.css"
import "./i18n/index.js"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GoalsProvider } from "./context/GoalsContext.jsx";

function App() {

  return (
    <>
      <GoalsProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppThemeProvider>
            <AppRoutes />
          </AppThemeProvider>
        </LocalizationProvider>
      </GoalsProvider>
    </>
  )
}

export default App
