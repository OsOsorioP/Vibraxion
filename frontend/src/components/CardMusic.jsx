import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  LinearProgress,
  Tooltip,
  Alert,
  Collapse,
  Box,
} from "@mui/material";
import { PlayArrow, SkipNext, Pause, Link, Close } from "@mui/icons-material";
import SpotifyBlack from "../../static/images/Full_Logo_Black_RGB.svg";
import BadgeDark from "../../static/images/19badge-dark.png";

export const CardMusic = (props) => {
  const [open, setOpen] = useState(false);

  const skipSong = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions).then((response) => {
      if (response.status === 204) {
        setOpen(true);
      }
    });
  };

  const pauseSong = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions).then((response) => {
      if (response.status === 204) {
        setOpen(true);
      }
    });
  };

  const playSong = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions).then((response) => {
      if (response.status === 204) {
        setOpen(true);
      }
    });
  };

  const songProgress = (props.time / props.duration) * 100;
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <div className="spotify_explicit">
            <img
              src={SpotifyBlack}
              alt="spotify"
              width={"75px"}
              height={"21px"}
            />
            {props.explicit ? (
              <img src={BadgeDark} alt="spotify" width={"30px"} />
            ) : (
              ""
            )}
          </div>
          <img
            src={props.image_url}
            alt=""
            className="border"
            height={"300"}
            width={"300"}
            style={{ border: "4px" }}
          />
          {props.title?.length > 20 ? (
            <div className="bounce">
              <ul>
                <li>
                  <Typography component="h6" variant="h6">
                    {props.title}
                  </Typography>
                </li>
              </ul>
              <ul>
                <li>
                  <Typography component="h6" variant="h6">
                    {props.title}
                  </Typography>
                </li>
              </ul>
            </div>
          ) : (
            <Typography component="h5" variant="h5">
              {props.title}
            </Typography>
          )}
          {props.artist?.length > 25 ? (
            <div className="bounce">
              <ul>
                <li>
                  <Typography component="h6" variant="h6">
                    {props.artist}
                  </Typography>
                </li>
              </ul>
              <ul>
                <li>
                  <Typography component="h6" variant="h6">
                    {props.artist}
                  </Typography>
                </li>
              </ul>
            </div>
          ) : (
            <Typography component="h5" variant="h5">
              {props.artist}
            </Typography>
          )}
          <Typography component="h7" variant="h7">
            {props.album}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Link">
            <IconButton href={props.link} target="_blank">
              <Link />
            </IconButton>
          </Tooltip>
          <Tooltip title="Pause/Play">
            <IconButton
              onClick={() => {
                props.is_playing ? pauseSong() : playSong();
              }}
            >
              {props.is_playing ? <Pause /> : <PlayArrow />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Skip Song">
            <IconButton onClick={() => skipSong()}>
              <SkipNext />
            </IconButton>
          </Tooltip>
        </CardActions>
        <Box sx={{ width: "100%" }}>
          <Collapse in={open}>
            <Alert
              severity="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Spotify Premium lets you play any track, podcast episode or audiobook, ad-free and with better audio quality. Go to <a href={"https://www.spotify.com/premium"} target="_blank">spotify.com/premium</a> to try it for free.
            </Alert>
          </Collapse>
        </Box>
        <LinearProgress
          variant="determinate"
          value={songProgress}
        ></LinearProgress>
      </Card>
    </>
  );
};
