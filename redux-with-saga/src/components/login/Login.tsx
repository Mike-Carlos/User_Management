import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import './login.css';
import { RootState } from "../../redux/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../redux/state/userState";
import { login } from "../../redux/saga/sessionSaga";
import { useNavigate } from "react-router-dom";


function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorIcon, setErrorIcon] = useState<JSX.Element>();
  const [helperText, setHelperText] = useState("");

  const errorMessage = useSelector((state: RootState) => state.sessionReducer.error);
  const [error, setErrorMessage] = React.useState<string | undefined>("");


  const navigate = useNavigate();

  /* THIS LINE IS USED TO FETCHED THE LOGGED IN USER'S INFO */
  const loggedUser = useSelector((state: RootState) => {
    return state.sessionReducer.user;
});

/* THIS LINE IS USED TO FETCHED THE AUTHENTICATION STATUS */
const isAuthenticated = useSelector((state: RootState) => {
    return state.sessionReducer.isAuthenticated;
});

React.useEffect(() => {
    // Remove this entire useEffect block
}, []);

const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(login({ username, password }));
    dispatch(clearError());
};

React.useEffect(() => {
    if (errorMessage === null) {
        setErrorMessage(undefined);
        dispatch(clearError());
        console.log("there's no error", error)
    } else {
        setErrorMessage(errorMessage);
        dispatch(clearError());
        console.log("may error ka!", error)
    }
}, [errorMessage, error, username, password, dispatch]);
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
          color="#e0f7fa"
            item
            xs={false}
            sm={4}
            md={7}
            className="custom-background"
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#2196f3" }}></Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleLogin}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={!isValid}
                            InputProps={{
                                endAdornment: errorIcon,
                            }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!isValid}
                            InputProps={{
                                endAdornment: errorIcon,
                            }}
                />
                {error && (<div style={{ color: "red", marginBottom: "10px" }}>{error}</div>)}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>

                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
