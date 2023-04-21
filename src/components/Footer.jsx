import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';

export default function Footer() {


  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar color="primary" className="sticky bottom-0" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Box
            sx={{
              width: "100%",
              height: "auto",
              backgroundColor: "primary.main",
              paddingTop: "auto",
              marginTop: "auto",
              paddingBottom: "0px",
            }}
          >
            <Container maxWidth="lg">
              <Grid container direction="column" alignItems="center">
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12} textAlign="center" >
                  <Typography color="textSecondary" variant="subtitle1">
                    {` React | Material UI | React Router`}
                  </Typography>
                  <Typography color="textSecondary" variant="subtitle1">
                    {` Copyright © Umit ${new Date().getFullYear()} `}
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );




















}