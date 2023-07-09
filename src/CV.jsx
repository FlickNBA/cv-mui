import * as colors from '@mui/material/colors';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { Avatar } from '@mui/material';
import { useState } from 'react';

import allCountries from './allCountries.json';
import Experience from './Experience';
import TextFieldWithState from './TextFieldWithState';
import MultilineWithState from './MultilineWithState';
import { formatPhoneNumber } from './helperFunctions';

export default function CV({ height, columns }) {
  const [firstName, setFirstName] = useState('Abraham');
  const [lastName, setLastName] = useState('Smith');
  const [emailAddress, setEmailAddress] = useState('abraham@smith.com');
  const [phoneNumber, setPhoneNumber] = useState(2004008820);
  const [city, setCity] = useState('Chicago');
  const [country, setCountry] = useState(['United States', '1']);
  const [aboutYou, setAboutYou] = useState(
    'Everyday regular normal guy. Long walks, old arcade games and books! I love my british shorthair cat!'
  );
  const [photo, setPhoto] = useState();
  const [experience, setExperience] = useState([
    {
      key: 0,
      company: 'Starbucks',
      position: 'Head Barista',
      where: 'Juarez, MX',
      from: 2020,
      to: 2021,
    },
    {
      key: 1,
      company: 'Microsoft',
      position: 'Live Support',
      where: 'Auckland, NZ',
      from: 2021,
      to: 2022,
    },
    {
      key: 2,
      company: 'Google',
      position: 'Junior Engineer',
      where: 'San Francisco, US',
      from: 2022,
      to: true,
    },
  ]);

  return (
    <>
      <Grid
        xs={columns[0]}
        sx={{
          height: `${height}%`,
          backgroundColor: colors.brown['A200'],
          paddingX: '1rem',
          paddingY: '1.5rem',
        }}
      >
        <Typography
          variant='h4'
          sx={{
            marginBottom: '1rem',
            marginLeft: '0.5rem',
            fontWeight: 400,
            color: colors.brown['800'],
          }}
        >
          Personal details
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <TextFieldWithState
              id='firstName'
              label='First name'
              state={setFirstName}
              type='text'
              value={firstName}
            />

            <TextFieldWithState
              id='lastName'
              label='Last name'
              state={setLastName}
              type='text'
              value={lastName}
            />

            <TextFieldWithState
              id='city'
              label='City'
              state={setCity}
              type='text'
              value={city}
            />

            <MultilineWithState
              id='aboutYou'
              label='About you'
              state={setAboutYou}
              value={aboutYou}
            />
          </Grid>

          <Grid xs={6}>
            <TextFieldWithState
              id='emailAddress'
              label='Email address'
              state={setEmailAddress}
              type='email'
              value={emailAddress}
            />

            <TextFieldWithState
              id='phoneNumber'
              label='Phone number'
              state={setPhoneNumber}
              type='number'
              value={phoneNumber}
            />

            <Autocomplete
              sx={{
                marginBottom: '1rem',
              }}
              value={country[0]}
              onChange={(e, NV) => setCountry([NV.label, NV.phone])}
              disablePortal
              id='country'
              options={allCountries}
              renderInput={(params) => (
                <TextField {...params} label='Country' />
              )}
            />

            <MuiFileInput
              fullWidth
              label='Upload your photo'
              value={photo}
              onChange={(e) => setPhoto(URL.createObjectURL(e))}
            />
          </Grid>
        </Grid>
        <Experience
          experience={experience}
          state={setExperience}
          withButtons={true}
          key={Number(true)}
        />
      </Grid>

      <Grid
        xs={columns[1]}
        sx={{
          height: `${height}%`,
          backgroundColor: colors.brown['800'],
          color: colors.brown['A100'],
          paddingX: '1rem',
          paddingY: '1.5rem',
        }}
      >
        <Grid container>
          <Grid xs={9}>
            <Typography
              variant='h3'
              sx={{
                color: colors.common['white'],
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography
              variant='h5'
              sx={{
                color: colors.brown['50'],
              }}
            >
              {emailAddress} | {formatPhoneNumber(country[1], phoneNumber)}
            </Typography>
            <Typography
              variant='h5'
              sx={{
                color: colors.brown['50'],
              }}
            >
              Based in {city}, {country[0]}
            </Typography>
            <Typography
              variant='p'
              sx={{
                color: colors.brown['50'],
              }}
            >
              {aboutYou}
            </Typography>
          </Grid>
          <Grid xs={3}>
            <Avatar
              variant='rounded'
              src={photo}
              sx={{
                border: 2,
                width: '100%',
                height: '100%',
                aspectRatio: '1/1',
              }}
            />
          </Grid>
        </Grid>
        <Experience
          experience={experience}
          state={setExperience}
          withButtons={false}
          key={Number(false)}
        />
      </Grid>
    </>
  );
}
