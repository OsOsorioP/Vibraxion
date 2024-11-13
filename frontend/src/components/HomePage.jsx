import React, { Component } from "react";
import { Grid2, Button, ButtonGroup, Typography, IconButton } from "@mui/material";
import { Help } from "@mui/icons-material";
import { Link, } from "react-router-dom";
import Info from "./Info";

export const HomePage = () => {

    return (
      <>
        <Grid2 container spacing={3}>
          <Grid2 item size={{ xs: 12 }} align="center">
            <Typography variant="h4" component="h4" className="title" align="center">
              Vibraxion
            </Typography>
          </Grid2>
          <Grid2 item size={{ xs: 12 }} align="center">
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button color="primary" to="/join" component={Link}>
                Join a Room
              </Button>
              <Button color="secondary" to="/create" component={Link}>
                Create a Room
              </Button>
            </ButtonGroup>
          </Grid2>
          <Grid2 item size={{ xs: 12 }} align="center">
            <IconButton color="info" to="/info" component={Link}>
              <Help fontSize="large" />
            </IconButton>
          </Grid2>
          <Grid2 item size={{ xs: 12 }} align="center">
            <Typography fontSize={'small'} color="error" align="center">
            NOTE: The Spotify API does not allow pausing or skipping songs unless you have a premium account.
            </Typography>
          </Grid2>
        </Grid2>
      </>
    );
}
