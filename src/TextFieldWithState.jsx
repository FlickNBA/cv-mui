import { TextField } from '@mui/material';

const handleChange = (e, state) => {
  state(e.target.value);
};

export default function TextFieldWithState({ id, label, state, type, value }) {
  return (
    <TextField
      color='primary'
      sx={{
        marginBottom: '1rem',
      }}
      fullWidth
      id={id}
      label={label}
      type={type}
      defaultValue={value}
      onChange={(e) => handleChange(e, state)}
    ></TextField>
  );
}
