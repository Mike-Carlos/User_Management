
import { Box, Container, Grid, Typography } from "@mui/material";

export default function Footer(){
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        opacity: .7,
        background: "#25476A",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          
          <Grid item xs={12}>
            <Typography color="#ffffff" variant="subtitle1">
              {`${new Date().getFullYear()} | Tsukiden Global Solutions`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
