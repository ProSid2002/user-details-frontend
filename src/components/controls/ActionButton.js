import { Button } from "@mui/material";
import React from "react";

const styles = {
  root: {
    minWidth: 0,
    m: 0.5,
  },
};

const ActionButton = (props) => {
  const { children, onClick, color, variant } = props;
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      sx={{ ...styles.root }}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
