import { Box, Tabs, Tab, TextField, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
export default function GoalControl(){
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
          placeholder="جستجو بر اساس عنوان"
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
          <InputLabel>Sort By</InputLabel>
          <Select defaultValue="newest" label="Sort By">
            <MenuItem value="progress"> پیشرفت %</MenuItem>
            <MenuItem value="newest">جدید ترین</MenuItem>
            <MenuItem value="category">دسته بندی</MenuItem>
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
            label="همه"
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
            label="فعال"
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
            label="تکمیل شده"
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
            label="متوقف"
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
              "&.Mui-selected": {
                // backgroundColor: "#ffffff",
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