
import { Box, Tabs, Card, Typography, Checkbox, LinearProgress, Stack, Tab, TextField, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
const goals = [
  {
    title: "خواندن ۱۰ کتاب",
    category: "مطالعه",
    progress: 60,
    date: "دهم فبروری",
    color: "#4A90E2",
    status: "active"
  },
  {
    title: "یادگیری زبان جدید",
    category: "آموزش",
    progress: 100,
    date: "اول مارچ",
    color: "#50C878",
    status: "completed"
  },
  {
    title: "ورزش ۳ بار در هفته",
    category: "سلامتی",
    progress: 75,
    date: "حالا",
    color: "#F5A623",
    status: "paused"
  },
  {
    title: "پس‌انداز ۵۰۰۰ دلار",
    category: "شخصی",
    progress: 55,
    date: "یازدهم اوپریل",
    color: "#4CAF50",
    status: "active"
  }
];
export default function GoalLists(){
    return(
      <Box>
         <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        mb: 3,
        alignItems: "center",
      }}
    >
  
      <Tabs
        value={0} // static for now
        aria-label="goal filters"
        textColor="primary"
        indicatorColor="primary"
        sx={{ flexGrow: 1 }}
      >
        <Tab label="همه" />
        <Tab label="فعال" />
        <Tab label="تکمیل شده" />
        <Tab label="متوقف" />
      </Tabs>

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
    </Box>
     <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        px: 2
      }}
    >
      <Stack spacing={2}>
        {goals.map((goal, index) => (
          <Card
            key={index}
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: 1.5
            }}
          >
            {/* Top Row */}
            <Stack
  direction="row"
  justifyContent="space-between"
  alignItems="center"
>
  <Checkbox
    checked={goal.status === "completed"}
    sx={{
      color: goal.color,
      "&.Mui-checked": {
        color: goal.color
      }
    }}
  />

  <Box sx={{ textAlign: "right", flexGrow: 1 }}>

    {/* Status Badge */}
    <Typography
      variant="caption"
      sx={{
        px: 1,
        py: 0.3,
        borderRadius: 2,
        display: "inline-block",
        mb: 0.5,
        fontSize: 11,
        bgcolor:
          goal.status === "active"
            ? "#E3F2FD"
            : goal.status === "completed"
            ? "#E8F5E9"
            : "#FFF3E0",
        color:
          goal.status === "active"
            ? "#1976D2"
            : goal.status === "completed"
            ? "#2E7D32"
            : "#EF6C00"
      }}
    >
      {goal.status === "active" && "فعال"}
      {goal.status === "completed" && "تکمیل شده"}
      {goal.status === "paused" && "متوقف"}
    </Typography>

    <Typography fontWeight={600}>
      {goal.title}
    </Typography>

    <Typography
      variant="caption"
      sx={{
        bgcolor: "#f1f3f5",
        px: 1,
        py: 0.3,
        borderRadius: 2,
        display: "inline-block",
        mt: 0.5
      }}
    >
      {goal.category}
    </Typography>
  </Box>
</Stack>
            {/* Progress */}
            <LinearProgress
              variant="determinate"
              value={goal.progress}
              sx={{
                height: 6,
                borderRadius: 5,
                backgroundColor: "#eee",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: goal.color
                }
              }}
            />

            {/* Date */}
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                textAlign: "left"
              }}
            >
              {goal.date}
            </Typography>
          </Card>
        ))}
      </Stack>
    </Box>
      </Box>
    )
}