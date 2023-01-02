import { MoreHoriz } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";

const LoadingComponent = () => {
  return (
    <Grid
      alignContent="center"
      display="flex"
      textAlign="center"
      justifyContent="center"
    >
      <MoreHoriz />
    </Grid>
  );
};

export default LoadingComponent;
