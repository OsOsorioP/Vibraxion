import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Typography, Grid2, Button, IconButton } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { CreateRoomPage } from "./CreateRoomPage";
import { CardMusic } from "./CardMusic";

export const Room = ({ codeReset }) => {
  const { roomCode } = useParams();
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [song, setSong] = useState({})

  const authenticateSpotify = useCallback(() => {
    fetch("/spotify/is-authenticated")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSpotifyAuthenticated(data.status);
        console.log(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      }).catch((error) => console.error("Spotify authentication error:", error));;
  }, []);

  const getRoomDetails = useCallback(() => {
    fetch("/v1/get-room?code=" + roomCode)
      .then((response) => {
        if (!response.ok) {
          codeReset();
          setRedirect(true);
          return;
        }
        return response.json();
      })
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
        if (data.is_host && !spotifyAuthenticated) {
          authenticateSpotify();
        }
      });
  }, [roomCode, authenticateSpotify, spotifyAuthenticated]);

  const getCurrentSong = useCallback(() => {
    fetch("/spotify/current-song")
      .then((response) => {
          return response.json();
      })
      .then((data) => {
        setSong(data);
      }).catch((error) => console.error("Current song error:", error));;
  }, []);

  useEffect(() => {
    getRoomDetails();
    getCurrentSong();
    const interval = setInterval(getCurrentSong, 1000);
    return () => clearInterval(interval);
  }, [getRoomDetails, getCurrentSong]);

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/v1/leave-room", requestOptions).then((response) => {
      codeReset();
      setRedirect(true);
    }).catch((error) => {
      console.error("Error leaving room: ", error);
    });;
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
      <Grid2 item size={{ xs: 12 }} align="center">
        <IconButton
          onClick={() => setShowSettings(true)}
        >
          <Settings/>
        </IconButton>
      </Grid2>
    );
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (showSettings) {
    return renderSettings();
  }

  return (
    <>
      <Grid2 container spacing={1}>
        <Grid2 item size={{ xs: 12 }} align="center">
          <Typography variant="h4" component="h4">
            Code: {roomCode}
          </Typography>
        </Grid2>
        <Grid2 item size={{ xs: 12 }} align="center">
          <Typography variant="h4" component="h6">
            Host: {isHost?.toString()}
          </Typography>
        </Grid2>
        <CardMusic {...song} />
        {isHost ? renderSettingsButton() : null}
        <Grid2 item size={{ xs: 12 }} align="center">
          <Button
            variant="contained"
            color="secondary"
            to="/"
            component={Link}
            onClick={leaveButtonPressed}
          >
            Leave Room
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
}
