import React, { useContext } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Box, Container, Grid, Typography, Paper } from "@material-ui/core";
import BandAdd from "../components/BandAdd";
import BandList from "../components/BandList";
import BandChart from "../components/BandChart";
import { SocketContext } from "../context/SocketContext";

const HomePage = () => {
  const { online } = useContext(SocketContext);
  return (
    <>
      <Container>
        <Box m={5}>
          {online ? (
            <MuiAlert
              style={{ width: "25%" }}
              severity="success"
              elevation={6}
              variant="filled"
            >
              Online
            </MuiAlert>
          ) : (
            <MuiAlert
              style={{ width: "25%" }}
              severity="error"
              elevation={6}
              variant="filled"
            >
              Offline
            </MuiAlert>
          )}
        </Box>
        <Box m={5}>
          <Typography variant="h3">BandNames</Typography>
        </Box>
        <Box m={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={5}>
                <Box p={5}>
                  <BandChart />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <BandList />
            </Grid>
            <Grid item xs={12} sm={6}>
              <BandAdd />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
