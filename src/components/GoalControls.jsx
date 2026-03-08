import { Box, Tabs, Tab, TextField, MenuItem, FormControl, Select, InputLabel, } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useTranslation } from "react-i18next";
export default function GoalControl({ setSearch, search, tabs, setTabs, sort, setSort }) {
  const { t } = useTranslation("goalcontrol")
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 3,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TextField
        placeholder={t("search")}
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          width: { xs: 180, sm: 200 },
        }}
      />
      <FormControl size="small" sx={{ width: { xs: 160, sm: 180 } }}>
        <InputLabel>{t("sortBy")}</InputLabel>
        <Select value={sort}
          onChange={(e) => setSort(e.target.value)} label="Sort By">
          <MenuItem value="progress">{t("sort.progress")}</MenuItem>
          <MenuItem value="newest">{t("sort.newest")}</MenuItem>
          <MenuItem value="category">{t("sort.category")}</MenuItem>
        </Select>
      </FormControl>
      <Tabs
        value={tabs}
        onChange={(e, newValue) => setTabs(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          flexGrow: 1,
          minHeight: "48px",
          "& .MuiTabs-indicator": {
            height: "4px",
            borderRadius: "4px",
            backgroundColor: "primary.main",
          },
        }}
      >
        <Tab
          label={t("tabs.all")}
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
          label={t("tabs.active")}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            "&.Mui-selected": {
              bgcolor: "action.selected",
              color: "primary.main",
            },
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        />
        <Tab
          label={t("tabs.completed")}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            "&.Mui-selected": {
              bgcolor: "action.selected",
              color: "primary.main",
            },
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        />
        <Tab
          label={t("tabs.paused")}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            "&.Mui-selected": {
              bgcolor: "action.selected",
              color: "primary.main",
            },
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        />
      </Tabs>

    </Box>
  )
}