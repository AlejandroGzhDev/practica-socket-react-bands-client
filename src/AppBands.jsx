import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import BandAdd from "./components/BandAdd";
import BandList from "./components/BandList";
import io from "socket.io-client";
const connectSocketServer = () => {
  const socket = io.connect("http://localhost:8080", {
    transports: ["websocket"],
  });
  return socket;
};
const AppBands = () => {
  const [socket] = useState(connectSocketServer());
  const [online, setOnline] = useState(false);
  const [bands,setBands] = useState([]);
  useEffect(() => {
    setOnline(socket.connected);
   
  }, [socket]);

  useEffect(() => {
  
    socket.on('connect',()=>{
      setOnline(true)
    })
 
  }, [socket])
  useEffect(() => {
  
    socket.on('disconnect',()=>{
      setOnline(false)
    })
  }, [socket])


  useEffect(() => {
    socket.on('current-bands',(bands)=>{
     setBands(bands)
    })
  }, [socket])
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
            <Grid item xs={12} sm={6}>
              <BandList 
              data={bands}
              />
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

export default AppBands;
