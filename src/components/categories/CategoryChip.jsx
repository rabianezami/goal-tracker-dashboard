import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function CategoryChip ({pathTo, categoryName}) {
      const navigate = useNavigate()

    return (
        <Box>
            <Button 
                onClick={() => navigate(pathTo)}
                sx={{
                    background: "#f59e0b",
                    color: "#ffffff",
                    px: 4,
                    "&:hover": {
                        backgroundColor: "#e8940d",
                        cursor: "pointer",
                    },
                    transition: "all 200ms ease-in-out",
                }}
            >
                {categoryName}
            </Button>
        </Box>
    )
}