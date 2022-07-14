import { TextField } from "@mui/material";

const Input = (props) => {
  const { name, value, onChange, label, type, error = null } = props;
  return (
    <TextField
      variant="outlined"
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default Input;
