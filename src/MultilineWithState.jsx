import { TextField } from '@mui/material';

const handleChange = (e, state) => {
  state(e.target.value);
};

export default function MultilineWithState({ id, label, state, value }) {
  return (
    <TextField
      color='primary'
      sx={{
        marginBottom: '1rem',
      }}
      fullWidth
      id={id}
      label={label}
      multiline
      defaultValue={value}
      onChange={(e) => handleChange(e, state)}
    ></TextField>
  );
}
