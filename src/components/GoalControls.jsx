import { Box, Tabs, Tab, TextField, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useTranslation } from "react-i18next";
export default function GoalControl(){
const {t} = useTranslation("goalList")
return(
<Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 6,
          mb: 3,
          alignItems: "center",
        }}
      >
        <TextField
          placeholder={t("searchPlaceholder")}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 200 }}
        />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>{t("sortBy")}</InputLabel>
          <Select defaultValue="newest" label="Sort By">
            <MenuItem value="progress">{t("sortProgress")}</MenuItem>
            <MenuItem value="newest">{t("sortNewest")}</MenuItem>
            <MenuItem value="category">{t("sortCategory")} </MenuItem>
          </Select>
        </FormControl>
        <Tabs
          value={0}
          aria-label="goal filters"
          sx={{
            flexGrow: 1,
            borderRadius: "12px",
            p: 1,
            minHeight: "48px",
            "& .MuiTabs-indicator": {
              height: "4px",
              borderRadius: "4px",
              backgroundColor: "#1976d2",
            },
          }}
        >
          <Tab
            label={t("tabAll")}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
              "&.Mui-selected": {
                backgroundColor: "#ffffff",
                color: "#1976d2",
              },
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            }}
          />
          <Tab
            label={t("tabActive")}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
              "&.Mui-selected": {
                backgroundColor: "#ffffff",
                color: "#1976d2",
              },
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            }}
          />
          <Tab
            label={t("tabCompleted")}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
              "&.Mui-selected": {
                backgroundColor: "#ffffff",
                color: "#1976d2",
              },
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            }}
          />
          <Tab
            label={t("tabStopped")}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
              "&.Mui-selected": {
                color: "#1976d2",
              },
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            }}
          />
        </Tabs>

      </Box>
)
}