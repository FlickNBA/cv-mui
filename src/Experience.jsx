import * as colors from '@mui/material/colors';
import { Typography } from '@mui/material';
import { Card } from '@mui/material';
import { CardActions } from '@mui/material';
import { CardContent } from '@mui/material';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

// Object { key: 0, company: "Starbucks", position: "Barista", where: "Boston, United States", from: 2020, to: 2021 }

function ExperienceCard({ experience, state, withButtons }) {
  console.log(experience);
  let expTo = Number.isInteger(experience.to) ? experience.to : 'NOW';

  return withButtons ? (
    <Card
      sx={{
        border: 1,
        backgroundColor: colors.brown['100'],
        color: colors.brown['900'],
      }}
    >
      <CardContent
        sx={{
          padding: '0.5rem',
          paddingBottom: '0.25rem !important',
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '1rem',
          }}
        >
          {experience.where}
        </Typography>
        <Typography
          variant='h5'
          sx={{
            fontWeight: 500,
          }}
        >
          {experience.position}
        </Typography>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 400,
          }}
        >
          {experience.company}
        </Typography>
        <Typography
          sx={{
            fontSize: '1.25rem',
            textAlign: 'right',
            fontWeight: 600,
          }}
        >
          {experience.from}-{expTo}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'end',
        }}
      >
        <Button variant='outlined' size='small'>
          Edit
        </Button>
        <Button variant='contained' size='small'>
          Remove
        </Button>
      </CardActions>
    </Card>
  ) : (
    <Card
      sx={{
        border: 1,
        backgroundColor: colors.brown['100'],
        color: colors.brown['900'],
      }}
    >
      <CardContent
        sx={{
          padding: '0.5rem',
          paddingBottom: '0.25rem !important',
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '1rem',
          }}
        >
          {experience.where}
        </Typography>
        <Typography
          variant='h5'
          sx={{
            fontWeight: 500,
          }}
        >
          {experience.position}
        </Typography>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 400,
          }}
        >
          {experience.company}
        </Typography>
        <Typography
          sx={{
            fontSize: '1.25rem',
            textAlign: 'right',
            fontWeight: 600,
          }}
        >
          {experience.from}-{expTo}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function Experience({ experience, state, withButtons }) {
  return (
    <Grid container columns={3} spacing={1}>
      {experience.map((exp) => {
        //console.log(exp);
        return (
          <Grid xs={1}>
            <ExperienceCard
              experience={exp}
              state={state}
              key={exp.key}
              withButtons={withButtons}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
