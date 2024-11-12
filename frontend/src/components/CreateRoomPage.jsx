import React, { useState } from "react";
import {
  Typography,
  Grid2,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Container,
  Collapse,
  Alert,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";

const defaultProps = {
  votesToSkip: 2,
  guestCanPause: true,
  update: false,
  errorMsg: "",
  successMsg: "",
  roomCode: null,
  updateCallBack: () => { },
};

export const CreateRoomPage = () => {
  const [guestCanPause, setGuestCanPause] = useState(defaultProps.guestCanPause);
  const [votesToSkip, setVotesToSkip] = useState(defaultProps.votesToSkip);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [roomCode, setRoomCode] = useState(null);

  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  }

  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === "true" ? true : false)
  }

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };
    fetch("/v1/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => { setRedirect(true); setRoomCode(data.code); });
  }

  const handleUpdateButtonPressed = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: defaultProps.roomCode,
      }),
    };
    fetch("/v1/update-room", requestOptions).then((response) => {
      if (response.ok) {
        setSuccessMsg("Room Updated successfully!",);
      } else {
        setErrorMsg("Erros updating Room...")
      }
      defaultProps.updateCallBack();
    });
  }

  const renderCreateButton = () => {
    return (
      <>
        <Grid2 item size={{ xs: 12 }} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleRoomButtonPressed}
          >
            Create Room
          </Button>
        </Grid2>
        <Grid2 item size={{ xs: 12 }} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid2>
      </>
    );
  }

  const renderUpdateButton = () => {
    return (
      <Grid2 item size={{ xs: 12 }} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleUpdateButtonPressed}
        >
          Update Room
        </Button>
      </Grid2>
    );
  }

  const title = defaultProps.update ? "Update Room" : "Create a Room";
  if (redirect) {
    return <Navigate to={`/room/${roomCode}`} />;
  }
  return (
    <Container>
      <Grid2 container spacing={1}>
        <Grid2 item size={{ xs: 12 }} align="center">
          <Collapse
            in={errorMsg != "" || successMsg != ""}
          >
            {successMsg != "" ? (
              <Alert
                severity="success"
                onClose={() => setSuccessMsg("")}
              >
                {successMsg}
              </Alert>
            ) : (
              <Alert
                severity="error"
                onClose={() => setErrorMsg("")}
              >
                {errorMsg}
              </Alert>
            )}
          </Collapse>
        </Grid2>
        <Grid2 item size={{ xs: 12 }} align="center">
          <Typography component="h4" variant="h4">
            {title}
          </Typography>
        </Grid2>
        <Grid2 item size={{ xs: 12 }} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue={defaultProps.guestCanPause.toString()}
              onChange={handleGuestCanPauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid2>
        <Grid2 item size={{ xs: 12 }} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              onChange={handleVotesChange}
              defaultValue={votesToSkip}
              slotProps={{
                htmlInput: { min: 1, max: 6, style: { textAlign: "center" } },
              }}
            />
            <FormHelperText>
              <div aling="center">Votes Required To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid2>
        {defaultProps.update
          ? renderUpdateButton()
          : renderCreateButton()}
      </Grid2>
    </Container>
  );
}
