import {
  Box,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useTranslation } from "react-i18next";

export default function GoalControl({ filterTabs, setFilterTabs, searchText, setSearchText,
  sortOption, setSortOption }) {
  const { t } = useTranslation("goalList");
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
        px: 2,
      }}
    >

      <Box
        sx={{
          width: "100%",
          maxWidth: 520,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
          mb: 2,
        }}
      >
        <TextField
          size="small"
          placeholder={t("searchPlaceholder")}
          sx={{ flex: 1 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size="small" sx={{ width: { xs: "70%", sm: 180 } }}>
          <InputLabel>{t("sortBy")}</InputLabel>
          <Select value={sortOption}
            onChange={(e) => setSortOption(e.target.value)} label={t("sortBy")}>
            <MenuItem value="progress">{t("sortProgress")}</MenuItem>
            <MenuItem value="newest">{t("sortNewest")}</MenuItem>
            <MenuItem value="category">{t("sortCategory")}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Tabs */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >

        <Tabs
          value={filterTabs}
          onChange={(e, newValue) => setFilterTabs(newValue)}
          centered
          sx={{
            minHeight: 40,

            "& .MuiTabs-flexContainer": {
              gap: { xs: 0, sm: 1 },
            },

            "& .MuiTab-root": {
              textTransform: "none",
              minHeight: 36,
              fontSize: { xs: "0.7rem", sm: "0.9rem" },
              px: { xs: 0, sm: 2 },
            },

            "& .MuiTabs-indicator": {
              height: 3,
              borderRadius: 3,

            },
          }}
        >
          <Tab label={t("tabAll")} />
          <Tab label={t("tabActive")} />
          <Tab label={t("tabCompleted")} />
          <Tab label={t("tabStopped")} />
        </Tabs>
      </Box>
    </Box>
  );
}