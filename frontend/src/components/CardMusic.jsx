import React from "react";
import { Grid2, Typography, Card, IconButton, LinearProgress } from '@mui/material'
import { PlayArrow, SkipNext, Pause } from '@mui/icons-material'

export const CardMusic = (props) => {
    const skipSong = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/skip", requestOptions);
    }

    const pauseSong = () => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/pause", requestOptions)
    }

    const playSong = () => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/play", requestOptions)
    }

    const songProgress = (props.time / props.duration) * 100

    return (
        <Card size={{ xs: 12 }}>
            <Grid2 container alignItems='center'>
                <Grid2 item size={{ xs: 4 }} align="center">
                    <img src={props.image_url} alt="" height={'100%'} width={'100%'} />
                </Grid2>
                <Grid2 item size={{ xs: 8 }} align="center">
                    <Typography component="h5" variant="h5">
                        {props.title}
                    </Typography>
                    <Typography component="textSecondary" variant="suvtitle">
                        {props.artist}
                    </Typography>
                    <div>
                        <IconButton onClick={() => {
                            props.is_playing ? pauseSong() : playSong();
                        }}
                        >
                            {props.is_playing ? <Pause /> : <PlayArrow />}
                        </IconButton>
                        <IconButton onClick={() => skipSong()}><SkipNext />{props.votes}/{" "}{props.votes_required}</IconButton>
                    </div>
                </Grid2>
            </Grid2>
            <LinearProgress variant="determinate" value={songProgress}></LinearProgress>
        </Card>
    )
}