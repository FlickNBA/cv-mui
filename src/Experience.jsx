import * as colors from '@mui/material/colors';
import { useState } from 'react';
import { Modal, Typography } from '@mui/material';
import { Card } from '@mui/material';
import { CardActions } from '@mui/material';
import { CardContent } from '@mui/material';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import TextFieldWithState from './TextFieldWithState';
import { Autocomplete } from '@mui/material';
import allCountries from './allCountries.json';
import { TextField } from '@mui/material';
import { findCountryByCode } from './helperFunctions';

function removeCard({ e, allExperience, experience, state }) {
  //   console.log(e, experience, state);
  //   console.log(experience);
  //   console.log(e);
  //   console.log(allExperience);
  state(allExperience.filter((a) => a.key !== experience.key));
}

function ExperienceCard({
  experience,
  allExperience,
  state,
  key,
  withButtons,
}) {
  const [countryModal, setCountryModal] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    //['United States', '1']
    let expCountry = findCountryByCode(experience.where.split(', ')[1]);
    setCountryModal([expCountry.label, expCountry.code]);
  };
  const handleClose = () => setOpen(false);
  let expTo = Number.isInteger(experience.to) ? experience.to : 'NOW';

  //   {
  //   key: 0,
  //   company: 'Starbucks',
  //   position: 'Head Barista',
  //   where: 'Miami, US',
  //   from: 2020,
  //   to: 2021,
  // },

  return withButtons ? (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        key={key}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '33%',
            backgroundColor: colors.brown['200'],
            boxShadow: 24,
            padding: '1rem',
          }}
        >
          <Typography
            id='modal-modal-title'
            sx={{
              color: colors.brown['900'],
              marginBottom: '1rem',
              fontWeight: 700,
            }}
            variant='h5'
          >
            EDIT
          </Typography>
          <TextFieldWithState
            id='position'
            label='Position'
            // state={setFirstName}
            type='text'
            value={experience.position}
          />

          <Grid container columns={2} spacing={1}>
            <Grid xs={1}>
              <TextFieldWithState
                id='company'
                label='Company'
                // state={setLastName}
                type='text'
                value={experience.company}
              />
            </Grid>
            <Grid xs={1}>
              <TextFieldWithState
                id='whereCity'
                label='City'
                // state={setCity}
                type='text'
                value={experience.where.split(',')[0]}
              />
            </Grid>
          </Grid>

          <Autocomplete
            sx={{
              marginBottom: '1rem',
            }}
            value={countryModal[0]}
            onChange={(e, NV) => setCountryModal([NV.label, NV.phone])}
            disablePortal
            id='country'
            options={allCountries}
            renderInput={(params) => <TextField {...params} label='Country' />}
          />
        </Box>
      </Modal>
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
          <Button
            variant='outlined'
            onClick={(e) =>
              handleOpen({
                e: e,
                allExperience: allExperience,
                experience: experience,
                state: state,
              })
            }
            size='small'
          >
            Edit
          </Button>
          <Button
            variant='contained'
            onClick={(e) =>
              removeCard({
                e: e,
                allExperience: allExperience,
                experience: experience,
                state: state,
              })
            }
            size='small'
          >
            Remove
          </Button>
        </CardActions>
      </Card>
    </>
  ) : (
    <Card
      sx={{
        border: 1,
        backgroundColor: colors.brown['900'],
        color: colors.brown['100'],
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
    <Grid container columns={3} spacing={1} key={Number(withButtons)}>
      {experience.map((exp) => {
        //console.log(exp);
        return (
          <Grid xs={1}>
            <ExperienceCard
              experience={exp}
              allExperience={experience}
              state={state}
              withButtons={withButtons}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
