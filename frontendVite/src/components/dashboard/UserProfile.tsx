import {
  Box,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  ThemeProvider,
} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import vinDp from "./../../assets/vinDp.jpg";
import patterns from "./../../assets/profBanner.png";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Typography } from "@material-ui/core";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import KeyIcon from "@mui/icons-material/Key";

const theme = createTheme();

theme.typography.h4 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
    fontFamily: "Raleway, Arial",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
};
const position = [
  {
    value: "DE1",
    label: "Design Engineer 1",
  },
  {
    value: "DE2",
    label: "Design Engineer 2",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

export default function UserProfile() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%" }}>
          <Paper
            sx={{ width: "100%", mb: 2, marginTop: 8, background: "#FAF9F6" }}
            elevation={20}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url(${patterns})`, // Set the background image
                backgroundSize: "cover",
                backgroundRepeat: `no-repeat`,
              }}
              width="100%"
              height="35vh"
            >
              <img
                src={vinDp}
                alt=""
                style={{
                    width:"200px",
                  borderRadius: "50%",
                  margin: "28px",
                  marginLeft: "500px",
                  
                }}
              />
            </Box>
          </Paper>

          <Paper
            sx={{ width: "100%", mb: 2, marginTop: 1, background: "#FAF9F6" }}
            elevation={20}
          >
            <div style={{ margin: "25px" }}>
              <Typography variant="h4">Edit User</Typography>

              <TextField
                disabled
                label="Associate ID"
                id="outlined-start-adornment"
                value="101"
                sx={{ m: 2, width: "20ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />{" "}
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Username"
                id="outlined-start-adornment"
                value="user"
                sx={{ m: 2, width: "25ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentityIcon />{" "}
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                id="outlined-select-currency"
                select
                label="Employeee Status"
                defaultValue="Department"
                sx={{ m: 2, width: "25ch" }}
                InputProps={{
                  startAdornment: (
                    <PeopleOutlineIcon
                      style={{ marginRight: "8px", color: "grey" }}
                    />
                  ),
                }}
              >
                {position.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  label="First Name"
                  id="outlined-start-adornment"
                  defaultValue="Wally"
                  sx={{ m: 2, width: "30ch" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PermIdentityIcon />{" "}
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Middle Name"
                  id="outlined-start-adornment"
                  defaultValue="Bay "
                  sx={{ m: 2, width: "30ch" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PermIdentityIcon />{" "}
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Last Name"
                  id="outlined-start-adornment"
                  defaultValue="Ola "
                  sx={{ m: 2, width: "30ch" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PermIdentityIcon />{" "}
                      </InputAdornment>
                    ),
                  }}
                />
</Box>

<Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
                <TextField
                  label="Email"
                  id="outlined-start-adornment"
                  defaultValue="tsukiden.tspi.com.ph "
                  sx={{ m: 2, width: "30ch" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon />{" "}
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                id="outlined-select-currency"
                select
                label="Position"
                defaultValue="DE1"
                sx={{ m: 2, width: "30ch" }}
                InputProps={{
                  startAdornment: (
                    <PeopleOutlineIcon
                      style={{ marginRight: "8px", color: "grey" }}
                    />
                  ),
                }}
              >
                {position.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="outlined-select-currency"
                select
                label="Role"
                defaultValue="Role"
                sx={{ m: 2, width: "30ch" }}
                InputProps={{
                  startAdornment: (
                    <BusinessCenterIcon
                      style={{ marginRight: "8px", color: "grey" }}
                    />
                  ),
                }}
              >
                {position.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="outlined-select-currency"
                select
                label="Department"
                defaultValue="Department"
                sx={{ m: 2, width: "30ch" }}
                InputProps={{
                  startAdornment: (
                    <PeopleOutlineIcon
                      style={{ marginRight: "8px", color: "grey" }}
                    />
                  ),
                }}
              >
                {position.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="outlined-select-currency"
                select
                label="Business Unit"
                defaultValue="Business Unit"
                sx={{ m: 2, width: "30ch" }}
                InputProps={{
                  startAdornment: (
                    <PeopleOutlineIcon
                      style={{ marginRight: "8px", color: "grey" }}
                    />
                  ),
                }}
              >
                {position.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Paper>
        </Box>
      </ThemeProvider>
    </>
  );
}
