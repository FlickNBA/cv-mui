import * as colors from '@mui/material/colors';
import { useState } from 'react';
import { FormControlLabel, Modal, Typography } from '@mui/material';
import { Card } from '@mui/material';
import { CardActions } from '@mui/material';
import { CardContent } from '@mui/material';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import { Autocomplete } from '@mui/material';
import allCountries from './allCountries.json';
import { TextField } from '@mui/material';
import { findCountryByCode } from './helperFunctions';
import { useRef } from 'react';
import { Checkbox } from '@mui/material';
import TextFieldWithState from './TextFieldWithState';

function removeCard({ allExperience, experience, state }) {
  state(allExperience.filter((a) => a.key !== experience.key));
}

function handleCheckbox({ e, setExpToDisabled, expTo, setExpTo }) {
  if (e.target.checked == true) {
    // console.log('I work here!');
    setExpTo(Number(2023));
    setExpToDisabled(true);
    // console.log(expTo);
  } else {
    setExpToDisabled(false);
  }
}

function saveCard({
  allExperience,
  experience,
  state,
  position,
  company,
  city,
  from,
  to,
  countryModal,
  close,
}) {
  let newExperience = { ...experience };
  if (position.length != 0) {
    newExperience.position = position;
  }
  if (company.length != 0) {
    newExperience.company = company;
  }
  if (city.length != 0) {
    newExperience.where = [city, countryModal[1]].join(', ');
  } else {
    newExperience.where = [
      newExperience.where.split(', ')[0],
      countryModal[1],
    ].join(', ');
  }
  newExperience.from = Number(from);
  if (Number(to) == 2023) {
    newExperience.to = true;
  } else {
    newExperience.to = Number(to);
  }
  // console.log(newExperience);
  let eCopy = [...allExperience];
  let index = eCopy.findIndex((e) => e.key == newExperience.key);
  eCopy[index] = newExperience;
  state(eCopy);
  close();
}

const handleOpen = ({
  setOpen,
  setExpFrom,
  setCheckboxChecked,
  setExpToDisabled,
  setExpTo,
  experience,
  setCountryModal,
  findCountryByCode,
  clean = false,
}) => {
  setOpen(true);
  // console.log(experience);
  //['United States', '1']
  setExpFrom(experience.from);
  if (experience.to === true) {
    setCheckboxChecked(true);
    setExpToDisabled(true);
    setExpTo(Number(2023));
  } else {
    setExpTo(experience.to);
    // console.log('setting exp');
  }
  let expCountry = findCountryByCode(experience.where.split(', ')[1]);
  // console.log(expCountry);
  setCountryModal([expCountry.label, expCountry.code]);
};

function ExperienceCard({
  experience,
  allExperience,
  state,
  key,
  withButtons,
}) {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [countryModal, setCountryModal] = useState([]);
  const [expFrom, setExpFrom] = useState();

  const [expTo, setExpTo] = useState();

  const [open, setOpen] = useState(false);
  const [expToDisabled, setExpToDisabled] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const editForm = useRef(['', '', '', '']);
  // const handleOpen = () => {
  //   setOpen(true);
  //   // console.log(experience);
  //   //['United States', '1']
  //   setExpFrom(experience.from);
  //   if (experience.to === true) {
  //     setCheckboxChecked(true);
  //     setExpToDisabled(true);
  //     setExpTo(Number(2023));
  //   } else {
  //     setExpTo(experience.to);
  //     // console.log('setting exp');
  //   }
  //   let expCountry = findCountryByCode(experience.where.split(', ')[1]);
  //   // console.log(expCountry);
  //   setCountryModal([expCountry.label, expCountry.code]);
  // };
  const handleClose = () => setOpen(false);
  let expToString = Number.isInteger(experience.to) ? experience.to : 'NOW';

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
          component='form'
          ref={editForm}
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
            type='text'
            value={experience.position}
            state={setPosition}
          />

          <Grid container columns={2} spacing={1}>
            <Grid xs={1}>
              <TextFieldWithState
                id='company'
                label='Company'
                type='text'
                value={experience.company}
                state={setCompany}
              />
            </Grid>
            <Grid xs={1}>
              <TextFieldWithState
                id='whereCity'
                label='City'
                type='text'
                value={experience.where.split(',')[0]}
                state={setCity}
              />
            </Grid>
          </Grid>

          <Autocomplete
            sx={{
              marginBottom: '1rem',
            }}
            value={countryModal[0]}
            onChange={(e, NV) => setCountryModal([NV.label, NV.code])}
            disablePortal
            id='country'
            options={allCountries}
            renderInput={(params) => <TextField {...params} label='Country' />}
          />

          <Grid container columns={2} spacing={1}>
            <Grid xs={1}>
              <TextFieldWithState
                id='expFrom'
                label='From'
                type='number'
                value={expFrom}
                state={setExpFrom}
              />
            </Grid>
            <Grid xs={1}>
              <TextFieldWithState
                id='expTo'
                label='To'
                type='number'
                disabled={expToDisabled}
                value={expTo}
                state={setExpTo}
                setValue={true}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) =>
                    handleCheckbox({
                      e: e,
                      setExpToDisabled: setExpToDisabled,
                      expTo: expTo,
                      setExpTo: setExpTo,
                    })
                  }
                  defaultChecked={checkboxChecked}
                />
              }
              label='I work here now'
            />
            <Button
              variant='contained'
              onClick={(e) =>
                saveCard({
                  e: e,
                  allExperience: allExperience,
                  experience: experience,
                  state: state,
                  position: position,
                  company: company,
                  city: city,
                  from: expFrom,
                  to: expTo,
                  countryModal: countryModal,
                  close: handleClose,
                })
              }
            >
              Save
            </Button>
          </Box>
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
            {experience.from}-{expToString}
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
                setOpen: setOpen,
                setExpFrom: setExpFrom,
                setCheckboxChecked: setCheckboxChecked,
                setExpToDisabled: setExpToDisabled,
                setExpTo: setExpTo,
                setCountryModal: setCountryModal,
                findCountryByCode: findCountryByCode,
                e: e,
                allExperience: allExperience,
                experience: experience,
                state: state,
                editForm: editForm,
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
          {experience.from}-{expToString}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function Experience({ experience, state, withButtons }) {
  let [sx, variant] = ['', ''];
  if (withButtons) {
    variant = 'h4';
    sx = {
      display: 'inline',
      marginBottom: '1rem',
      marginLeft: '0.5rem',
      marginRight: '1rem',
      fontWeight: 400,
      color: colors.brown['800'],
    };
  } else {
    variant = 'h3';
    sx = {
      marginY: '1rem',
      color: colors.common['white'],
    };
  }
  return withButtons ? (
    <>
      <Typography variant={variant} sx={sx}>
        Experience
      </Typography>
      <Button
        variant='contained'
        sx={{
          marginBottom: '1rem',
        }}
        onClick={(e) =>
          handleOpen({
            setOpen,
            setExpFrom,
            setCheckboxChecked,
            setExpToDisabled,
            setExpTo,
            experience,
            setCountryModal,
            findCountryByCode,
            clean: false,
          })
        }
      >
        Add new experience
      </Button>

      <Grid container columns={3} spacing={1}>
        {experience.map((exp) => {
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
    </>
  ) : (
    <>
      <Typography variant={variant} sx={sx}>
        Experience
      </Typography>
      <Grid container columns={3} spacing={1}>
        {experience.map((exp) => {
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
    </>
  );
}
