import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Grid2,
  Button,
  IconButton,
  Box,
  Tooltip,
  Chip,
} from "@mui/material";
import { Settings, ExitToApp, Group } from "@mui/icons-material";
import { CreateRoomPage } from "./CreateRoomPage";
import { CardMusic } from "../components/CardMusic";

export const Room = ({ codeReset }) => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [participants, setParticipants] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [song, setSong] = useState({});

  const authenticateSpotify = () => {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuthenticated(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      })
      .catch((error) => console.error("Error authenticating Spotify: ", error));
  };

  const getRoomDetails = () => {
    fetch("/v1/get-room?code=" + roomCode)
      .then((response) => {
        if (response.status === 404) {
          codeReset;
          navigate("/");
        }
        return response.json();
      })
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
        setParticipants(2);

        if (data.is_host && !spotifyAuthenticated) {
          authenticateSpotify();
        }
      })
      .catch((error) => console.error("Error getting room details: ", error));
  };

  const getCurrentSong = () => {
    fetch("/spotify/current-song")
      .then((response) => response.json())
      .then((data) => {
        setSong(data);
      })
      .catch((error) => console.error("Error getting current song: ", error));
  };

  useEffect(() => {
    getRoomDetails();
    const interval = setInterval(getCurrentSong, 1000);
    return () => clearInterval(interval);
  }, [roomCode]);

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/v1/leave-room", requestOptions)
      .then(() => {
        codeReset;
        navigate("/");
      })
      .catch((error) => {
        console.error("Error leaving room: ", error);
      });
  };

  const updateShowSettings = (value) => {
    setShowSettings(value);
  };

  const renderSettings = () => {
    return (
      <Grid2 container spacing={1}>
        <Grid2 item size={{ xs: 12 }} align="center">
          <CreateRoomPage
            update={true}
            votesToSkip={votesToSkip}
            guestCanPause={guestCanPause}
            roomCode={roomCode}
            updateCallBack={getRoomDetails}
          ></CreateRoomPage>
        </Grid2>
        <Grid2 item size={{ xs: 12 }} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid2>
      </Grid2>
    );
  };

  const renderSettingsButton = () => {
    return (
      <Tooltip title="Settings">
        <IconButton onClick={() => setShowSettings(true)}>
          <Settings sx={{ color: "black" }} />
        </IconButton>
      </Tooltip>
    );
  };

  if (showSettings) {
    return renderSettings();
  }

  return (
    <>
      <Box
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
          alignContent: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Grid2
          item
          size={2}
          sx={{ alignContent: "center", textAlign: "center" }}
        >
          <Chip icon={<Group />} label={participants} />
          <Typography variant="h5" component="h5">
            Code: {roomCode}
          </Typography>
          <Typography variant="h5" component="h5">
            Votes Skip
          </Typography>
          <Typography variant="h6" component="h6">
            {song.votes}/{song.votes_required}
          </Typography>
          {isHost ? renderSettingsButton() : null}
          <Tooltip title="Exit">
            <IconButton
              color="error"
              onClick={leaveButtonPressed}
            >
              <ExitToApp />
            </IconButton>
          </Tooltip>
        </Grid2>
        <Grid2
          item
          size={8}
          sx={{ alignContent: "center", textAlign: "center" }}
        >
          <CardMusic {...song} />
        </Grid2>
      </Box>
    </>
  );
};
