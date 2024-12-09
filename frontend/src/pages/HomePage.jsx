import React from "react";
import Grid from '@mui/material/Grid2';
import {
  Button,
  ButtonGroup,
  Typography,
  IconButton,
} from "@mui/material";
import { Help } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <Grid container spacing={3} className="center">
        <Grid item size={{ xs: 12}} align="center">
          <Typography
            variant="h4"
            component="h4"
            className="title"
            align="center"
          >
            Vibraxion
          </Typography>
        </Grid>
        <Grid item size={{ xs: 12}} align="center">
          <ButtonGroup disableElevation variant="contained">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item size={{ xs: 12}} align="center">
          <IconButton color="info" to="/info" component={Link}>
            <Help fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};
