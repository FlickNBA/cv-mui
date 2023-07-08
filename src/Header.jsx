import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
export default function Header({ height }) {
  return (
    <Grid
      xs={12}
      sx={{
        height: `${height}%`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingX: '2rem',
      }}
    >
      <Typography
        variant='h2'
        color='primary'
        sx={{
          fontWeight: 500,
        }}
      >
        CV Generator
      </Typography>
    </Grid>
  );
}
