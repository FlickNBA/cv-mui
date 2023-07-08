import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
export default function Footer({ height }) {
  return (
    <Grid
      xs={12}
      sx={{
        height: `${height}%`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        paddingX: '2rem',
      }}
    >
      <Typography
        variant='h5'
        color='secondary'
        sx={{
          fontWeight: 300,
        }}
      >
        Good luck! Copyright 2023 @ FlickNBA
      </Typography>
    </Grid>
  );
}
