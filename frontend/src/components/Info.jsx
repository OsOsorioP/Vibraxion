import React, { useEffect, useState } from "react";
import { Grid2, Button, Typography, IconButton } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Link } from 'react-router-dom'

const pages = {
    JOIN: 'pages.join',
    CREATE: 'pages.create'
}

export const Info = () => {
    const [page, setPage] = useState(pages.JOIN);

    function joinInfo() {
        return (
            <p>
                is a collaborative web music application that allows users to share and enjoy music sessions in real time. By integrating with the Spotify API, Vibraxion enables users to select and play songs while offering unique features like creating rooms, joining sessions, voting, or pausing the music.
            </p>
        )
    }
    function createInfo() {
        return (
            <p>
                Create a room, choose whether participants can pause the music or not, and set the number of votes required to skip a song. Finally, share the code with your friends or family.
            </p>
        )
    }

    useEffect(() => {

    }, [])

    return (
        <>
            <Grid2 container spacing={1}>
                <Grid2 item size={{ xs: 12 }} align="center">
                    <Typography component="h4" variant="h4">
                        What is Vibraxion
                    </Typography>
                </Grid2>
                <Grid2 item size={{ xs: 12 }} align="center">
                    <Typography variant="body1">
                        {page === pages.JOIN ? joinInfo() : createInfo()}
                    </Typography>
                </Grid2>
                <Grid2 item size={{ xs: 12 }} align="center">
                    <IconButton onClick={() => { page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE) }}>
                        {page === pages.CREATE ? (<NavigateBefore />) : (<NavigateNext />)}
                    </IconButton>
                </Grid2>
                <Grid2 item size={{ xs: 12 }} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}>
                        Back
                    </Button>
                </Grid2>
            </Grid2>
        </>
    )
}