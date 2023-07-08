import * as React from 'react';
import * as colors from '@mui/material/colors';
import Grid from '@mui/material/Unstable_Grid2';
import Header from './Header';
import CV from './CV';
import Footer from './Footer';

export default function App() {
  return (
    <Grid
      container
      sx={{
        height: '100vh',
      }}
    >
      <Header height={7.5} />
      <CV height={85} columns={[7, 5]} />
      <Footer height={7.5} />
    </Grid>
  );
}
