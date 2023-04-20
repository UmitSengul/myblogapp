import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';

function Footer() {
  


  return (
    <Box
    sx={{
      width: "100%",
      height: "auto",
      backgroundColor: "primary.main",
      paddingTop: "1rem",
      paddingBottom: "1rem",
    }}
  >
    <Container maxWidth="lg">
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography color="black" variant="h5">
            React Blog App 
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="textSecondary" variant="subtitle1">
            {` React | Material UI | React Router`}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {` Copyright © Umit ${new Date().getFullYear()} ` }
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
  );
}



export default Footer;