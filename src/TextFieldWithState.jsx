import { TextField } from '@mui/material';

const handleChange = (e, state) => {
  if (state) {
    console.log(e.target.value);
    state(e.target.value);
  }
};

export default function TextFieldWithState({
  id,
  label,
  state,
  type,
  value,
  disabled = false,
}) {
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
      disabled={disabled}
      defaultValue={value}
      onChange={(e) => handleChange(e, state)}
    ></TextField>
  );
}
