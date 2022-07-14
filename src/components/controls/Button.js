import { Button } from "@mui/material";

const MuiButton = (props) => {
  const {
    variant,
    size,
    text,
    onClick,
    color,
    sx,
    startIcon,
    endIcon,
    disabled,
  } = props;
  return (
    <Button
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      sx={sx}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default MuiButton;
