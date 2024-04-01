import {
  AlertColor,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputAdornment,
  ListItemText,
  MenuItem,
  Paper,
  SelectChangeEvent,
  Snackbar,
  TextField,
  ThemeProvider,
  styled,
  Grid
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
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserReset, clearUserInfo } from "../../redux/state/userState";
import { RootState } from "../../redux/store/store";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getUserInfo,
  getUserRoles,
  updateUserInfo,
} from "../../redux/saga/userSaga";
import { getDepartmentFetch } from "../../redux/state/departmentState";
import { getSectionFetch } from "../../redux/state/sectionState";
import { getRolesFetch } from "../../redux/state/roleState";
import { getPositionFetch } from "../../redux/state/positionState";
import { getEmployeeStatusFetch } from "../../redux/state/employeeStatusState";
import { setUserImg } from "../../redux/state/sessionState";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const GLOBAL_TIMEOUT = 5000;

export interface SnackbarMessage {
  message: string;
  key: number;
}

export interface State {
  open: boolean;
  snackPack: readonly SnackbarMessage[];
  messageInfo?: SnackbarMessage;
}

export default function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const loggedUserId = useSelector(
    (state: RootState) => state.sessionReducer.user?.id
  );

  const loadingState = useSelector(
    (state: RootState) => state.userReducer.isLoading
  );

  useEffect(() => {
    setIsLoading(loadingState);
  }, [loadingState]);

  const userId = location.state;

  // get the stored state of the user
  const userInfoData = useSelector(
    (state: RootState) => state.userReducer.userInfo
  );
  const [userData, setUserData] = React.useState<typeof userInfoData | null>(
    null
  );

  React.useEffect(() => {
    setUserData(userInfoData);
  }, [userInfoData]);

  React.useEffect(() => {
    dispatch(getUserInfo({ userId }));
    dispatch(getUserRoles({ userId }));
    dispatch(getDepartmentFetch());
    dispatch(getSectionFetch());
    dispatch(getRolesFetch());
    dispatch(getPositionFetch());
    dispatch(getEmployeeStatusFetch());
  }, [dispatch, userId]);

  const userRoles: any[] = useSelector(
    (state: RootState) => state.userReducer.userRoles
  );

  const [selectedRoles, setSelectedRoles] = React.useState<number[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof selectedRoles>) => {
    setSelectedRoles(event.target.value as number[]);
  };

  const notice = useSelector((state: RootState) => state.userReducer.notice);
  const isInitialAmount = React.useRef(true);
  React.useEffect(() => {
    if (!isInitialAmount.current) {
      if (notice.message && notice.severity) {
        handleClickSnackpack(notice.message, notice.severity as AlertColor)();
      }
    } else {
      isInitialAmount.current = false;
    }
  }, [notice]);

  const [snackPack, setSnackPack] = React.useState<readonly SnackbarMessage[]>(
    []
  );
  const [severity, setSeverity] = React.useState<AlertColor>("error");
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState<
    SnackbarMessage | undefined
  >(undefined);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClickSnackpack =
    (message: string, severity: AlertColor) => () => {
      setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
      setSeverity(severity);
    };

  const handleClose = (event: React.SyntheticEvent | Event) => {
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const user = useSelector((state: RootState) => state.sessionReducer.user);
  const isAddSuccess = useSelector(
    (state: RootState) => state.userReducer.isAddSuccess
  );
  React.useEffect(() => {
    if (isAddSuccess) {
      dispatch(addUserReset());
      setTimeout(() => {
        navigate("/users");
        dispatch(clearUserInfo());
      }, GLOBAL_TIMEOUT);
    }
  });
  React.useEffect(() => {
    if (userData) {
      setAssocID(userData.emp_id);
      setUsername(userData.username);
      setPassword(userData.password);
      setFirstName(userData.fname);
      setMiddleName(userData.mname);
      setLastName(userData.lname);
      setPosition(userData.position_id ? userData.position_id : 0);
      setEmail(userData.email);
      setBusinessUnit(userData.dept_id ? userData.dept_id : 0);
      setDepartment(userData.section_id ? userData.section_id : 0);
      setEmpStatus(userData.status_code);
    }
  }, [userData]);

  React.useEffect(() => {
    const roles = userRoles.map((e) => {
      const values = Object.keys(e);
      return parseInt(values[0]);
    });
    setSelectedRoles(roles);
  }, [userRoles]);

  const [username, setUsername] = useState("");
  const [assocID, setAssocID] = useState("");
  const [empStatus, setEmpStatus] = useState("0");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState(0);
  const [email, setEmail] = useState("");
  const [businessUnit, setBusinessUnit] = useState(0);
  const [department, setDepartment] = useState(0);
  const [password, setPassword] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [ask, setAsk] = React.useState(false);
  const [askSave, setAskSave] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogTitleSave, setDialogTitleSave] = React.useState("");
  const [dialogContentText, setDialogContentText] = React.useState("");
  const [dialogContentTextSave, setDialogContentTextSave] = React.useState("");
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i;
  const isEmailValid = emailRegex.test(email);

  React.useEffect(() => {
    console.log("user", user);
  }, [user]);

  //FOR DROPDOWN CONFIG (BUSINESS UNIT)
  const depts = useSelector((state: RootState) => state.deptReducer.department);

  //FOR DROPDOWN CONFIG (DEPARTMENT)
  const sections = useSelector(
    (state: RootState) => state.sectionReducer.section
  );

  //FOR ROLES OPTIONS
  const roles = useSelector((state: RootState) => state.roleReducer.roles);

  //FOR POSITION OPTIONS
  const positions = useSelector(
    (state: RootState) => state.positionReducer.position
  );

  //FOR STATUS OPTIONS
  const statuses = useSelector(
    (state: RootState) => state.employeeStatusReducer.employeeStatus
  );

  const proceedWithCancel = () => {
    dispatch(clearUserInfo());
    navigate("/users");
  };

  const proceedWithSaving = () => {
    const data = {
      emp_id: assocID,
      username: username,
      password: password,
      confirm_password: confirmPassword,
      admin_password: adminPassword,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
      fname: firstName.trim(),
      mname: middleName.trim(),
      lname: lastName.trim(),
      position_id: position,
      email: email,
      section_id: department,
      dept_id: businessUnit,
      selectedRoles: selectedRoles,
      status_code: empStatus,
      img_src: selectedImage,
    };
    dispatch(updateUserInfo({ data }));
    setAskSave(false);
    setAsk(false);

    if (loggedUserId === assocID) {
      dispatch(setUserImg(""));
      console.log("NA-CLEAR NAMAN");
    }
  };

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setFormSubmitted(true);
    if (
      !assocID ||
      !username ||
      !password ||
      !firstName ||
      !lastName ||
      !position ||
      !email ||
      !department ||
      !businessUnit ||
      !empStatus ||
      selectedRoles.length === 0
    ) {
      handleClickSnackpack("Please fill in the required fields.", "error")();
    } else if (
      assocID &&
      username &&
      password &&
      firstName &&
      lastName &&
      position &&
      email &&
      department &&
      businessUnit &&
      empStatus !== "0" &&
      selectedRoles.length > 0
    ) {
      if (password.length > 5) {
        if (isEmailValid) {
          setAskSave(true);
          setDialogTitleSave("Save the record?");
          setDialogContentTextSave(
            "Upon proceeding, the modifications on the record \nmade will be saved."
          );
        } else {
          handleClickSnackpack(
            "Please enter a valid information. 1",
            "error"
          )();
        }
      } else {
        handleClickSnackpack("Please enter a valid information. 3", "error")();
      }
    } else {
      handleClickSnackpack(
        "All fields are required. Please, try again.",
        "error"
      )();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleCancel = () => {
    setAsk(true);
    setDialogTitle("Cancel the edit?");
    setDialogContentText(
      " The record will be discarded and will not be saved. \nAre you sure you want to leave this page?"
    );
  };
  return (
    <>
     <ThemeProvider theme={theme}>
  <Box sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
    <Paper
      sx={{
        width: "100%",
        mb: 2,
        marginTop: 8,
        background: "#FAF9F6",
      }}
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
              <div>
                {/* Display the selected image */}
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                  />
                ) : // Display the user's image if available, otherwise show the default profile
                userData?.img_src ? (
                  <img
                    src={require(`../../../Assets/userImage/${userData.img_src}`)} // Construct the image source
                    alt="User Profile"
                  />
                ) : (
                  <img
                    src={vinDp}
                    alt=""
                    style={{
                      width: "200px",
                      borderRadius: "50%",
                      margin: "28px",
                      marginLeft: "500px",
                    }}
                  />
                )}
                <div
                  style={{
                    height: "80px",
                    width: "80px",
                    position: "absolute",
                    right: "0",
                    top: "70%",
                    display: "grid",
                    placeItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <Button
                    component="label"
                    sx={{
                      overflow: "hidden",
                      borderRadius: "50%",
                      height: "60px",
                      width: "54px",
                      background: "rgba(200, 200, 200, 0.75)",
                      margin: 0,
                      padding: 0,
                      boxShadow:
                        "rgba(60, 64, 67, 0.7) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                      "&:hover": {
                        background: "rgba( 237, 249, 255, 0.75 )",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <CameraAltOutlinedIcon
                      sx={{
                        height: "30px",
                        width: "30px",
                        margin: 0,
                        padding: 0,
                      }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </div>
              </div>
            </Box>
          </Paper>

          <Paper
            sx={{ width: "100%", mb: 2, marginTop: 1, background: "#FAF9F6" }}
            elevation={20}
          >
           <Grid container spacing={2}>
  {/* First row of text fields */}
  <Grid item xs={12} md={4}>
    <FormControl fullWidth>
      <TextField
        disabled
        label="Associate ID"
        error={formSubmitted && assocID === ""}
        helperText={
          formSubmitted && assocID === "" ? "Associate ID required" : ""
        }
        id="outlined-start-adornment"
        placeholder="Associate ID"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyIcon />{" "}
            </InputAdornment>
          ),
        }}
        value={assocID}
        onChange={(e) => setAssocID(e.target.value)}
      />
    </FormControl>
  </Grid>
  <Grid item xs={12} md={4}>
    <FormControl fullWidth>
      <TextField
        label="Username"
        error={formSubmitted && username === ""}
        helperText={
          formSubmitted && username === "" ? "Username required" : ""
        }
        id="outlined-start-adornment"
        placeholder="Username"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PermIdentityIcon />{" "}
            </InputAdornment>
          ),
        }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </FormControl>
  </Grid>
  <Grid item xs={12} md={4}>
    <FormControl fullWidth>
      <TextField
        id="outlined-select-currency"
        select
        label="Employee Status"
        value={empStatus}
        onChange={(e) => setEmpStatus(e.target.value)}
        InputProps={{
          startAdornment: (
            <PeopleOutlineIcon
              style={{ marginRight: "8px", color: "grey" }}
            />
          ),
        }}
      >
        <MenuItem key={0} value={"0"}>
          {"<Select status>"}
        </MenuItem>
        {statuses.map((status: any) => (
          <MenuItem key={status?.status_code} value={status?.status_code}>
            {status?.status_name}
          </MenuItem>
        ))}
      </TextField>
      {formSubmitted && empStatus === "0" && (
        <FormHelperText>Employee Status required</FormHelperText>
      )}
    </FormControl>
  </Grid>
  
  {/* Second row of text fields */}
  <Grid item xs={12} md={4}>
    <FormControl fullWidth>
      <TextField
        label="First Name"
        id="outlined-start-adornment"
        error={formSubmitted && firstName === ""}
        helperText={
          formSubmitted && firstName === "" ? "First Name required" : ""
        }
        placeholder="First Name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PermIdentityIcon />{" "}
            </InputAdornment>
          ),
        }}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </FormControl>
  </Grid>
  <Grid item xs={12} md={4}>
    <FormControl fullWidth>
      <TextField
        label="Middle Name"
        id="outlined-start-adornment"
        placeholder="Middle Name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PermIdentityIcon />{" "}
            </InputAdornment>
          ),
        }}
        value={middleName}
        onChange={(e) => setMiddleName(e.target.value)}
      />
    </FormControl>
  </Grid>
  <Grid item xs={12} md={4}>
    <FormControl fullWidth>
      <TextField
        label="Last Name"
        error={formSubmitted && lastName === ""}
        helperText={
          formSubmitted && lastName === "" ? "Last Name required" : ""
        }
        id="outlined-start-adornment"
        placeholder="Last Name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PermIdentityIcon />{" "}
            </InputAdornment>
          ),
        }}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </FormControl>
  </Grid>

  {/* Third row of text fields */}
  <Grid item xs={12} md={4}>
    <FormControl fullWidth>
      <TextField
        label="Email"
        id="outlined-start-adornment"
        error={formSubmitted && email === ""}
        helperText={
          formSubmitted && email === "" ? "Email required" : ""
        }
        placeholder="Email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutlineIcon />{" "}
            </InputAdornment>
          ),
        }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </FormControl>
  </Grid>
  <Grid item xs={12} md={4}>
    <FormControl fullWidth>
      <TextField
        id="outlined-select-currency"
        select
        label="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value as unknown as number)}
        InputProps={{
          startAdornment: (
            <PeopleOutlineIcon
              style={{ marginRight: "8px", color: "grey" }}
            />
          ),
        }}
      >
        <MenuItem key={0} value={0}>
          {"<Select a position>"}
        </MenuItem>
        {positions.map((pos: any) => (
          <MenuItem key={pos?.position_id} value={pos?.position_id}>
            {pos?.position_name}
          </MenuItem>
        ))}
      </TextField>
      {formSubmitted && position === 0 && (
        <FormHelperText>Position required</FormHelperText>
      )}
    </FormControl>
  </Grid>
  <Grid item xs={12} md={4}>
    <FormControl fullWidth>
      <TextField
        id="outlined-select-currency" 
        select
        label="Role"
        multiple
        value={selectedRoles}
        onChange={handleChange}
        renderValue={(selected: any) => {
          const selectedTitles: string[] = selectedRoles.map(
            (roleId) => {
              const matchingRole: any = roles.find(
                (role: any) => role.role_id === roleId
              );
              return matchingRole ? matchingRole.title : "";
            }
          );
          return selectedTitles.join(", ");
        }}
        MenuProps={MenuProps}
        InputProps={{
          startAdornment: (
            <BusinessCenterIcon
              style={{ marginRight: "8px", color: "grey" }}
            />
          ),
        }}
      >
        {roles.map((role: any) => (
          <MenuItem key={role.role_id} value={role.role_id}>
            <Checkbox
              checked={
                selectedRoles.indexOf(role.role_id as never) >
                -1
              }
            />
            <ListItemText primary={role.title} />
          </MenuItem>
        ))}
      </TextField>
      {formSubmitted && selectedRoles.length === 0 && (
        <FormHelperText>Role required</FormHelperText>
      )}
    </FormControl>
  </Grid>

  {/* Fourth row of text fields */}
  <Grid item xs={12} md={4}>
    <FormControl fullWidth>
      <TextField
        id="outlined-select-currency"
        select
        label="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value as unknown as number)}
        InputProps={{
          startAdornment: (
            <BusinessCenterIcon
              style={{ marginRight: "8px", color: "grey" }}
            />
          ),
        }}
      >
        <MenuItem key={0} value={0}>
          {"<Select department>"}
        </MenuItem>
        {depts.map((dept: any) => (
          <MenuItem key={dept?.dept_id} value={dept?.dept_id}>
            {dept?.dept_name}
          </MenuItem>
        ))}
      </TextField>
      {formSubmitted && department === 0 && (
        <FormHelperText>Department required</FormHelperText>
      )}
    </FormControl>
  </Grid>
  <Grid item xs={12} md={4}>
    <FormControl fullWidth>
      <TextField
        id="outlined-select-currency"
        select
        label="Business Unit"
        value={businessUnit}
        onChange={(e) => setBusinessUnit(e.target.value as unknown as number)}
        InputProps={{
          startAdornment: (
            <BusinessCenterIcon
              style={{ marginRight: "8px", color: "grey" }}
            />
          ),
        }}
      >
        <MenuItem key={0} value={0}>
          {"<Select business unit>"}
        </MenuItem>
        {sections.map((sect: any) => (
                            <MenuItem
                              key={sect?.section_id}
                              value={sect?.section_id}
                            >
                              {sect?.section_name}
          </MenuItem>
        ))}
      </TextField>
      {formSubmitted && businessUnit === 0 && (
        <FormHelperText>Business Unit required</FormHelperText>
      )}
    </FormControl>
  </Grid>
</Grid>
    
       </Paper>
      </Box>
      </ThemeProvider>
    </>
  );
}
