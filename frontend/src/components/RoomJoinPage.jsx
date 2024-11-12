import React, { useState } from "react";
import {
  Typography,
  Grid2,
  TextField,
  Button,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";

export const RoomJoinPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
  }

  const roomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/v1/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          setRedirect(true);
        } else {
          setError("Room not found.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (redirect) {
    <Navigate to={`/room/${roomCode}`} />;
  }

  return (

    <>
      <Grid2 container spacing={1}>
        <Grid2 item size={{ xs: 12 }} align="center">
          <Typography variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid2>
        <Grid2 item size={{ xs: 12 }} align="center">
          <TextField
            error={!!error}
            label="Code"
            placeholder="Enter a Room Code"
            value={roomCode}
            helperText={error}
            variant="outlined"
            onChange={handleTextFieldChange}
          />
        </Grid2>
        <Grid2 item size={{ xs: 12 }} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={roomButtonPressed}
          >
            Enter Room
          </Button>
        </Grid2>
        <Grid2 item size={{ xs: 12 }} align="center">
          <Button
            color="secondary"
            variant="contained"
            to="/"
            component={Link}
          >
            Back
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
}
