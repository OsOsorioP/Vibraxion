import React, { lazy, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const LazyHomePage = lazy(() => import('../../components/HomePage').then(module => ({ default: module.HomePage })));

const LazyRoomJoinPage = lazy(() => import('../../components/RoomJoinPage').then(module => ({ default: module.RoomJoinPage })));

const LazyRoom = lazy(() => import('../../components/Room').then(module => ({ default: module.Room })));

const LazyCreateRoomPage = lazy(() => import('../../components/CreateRoomPage').then(module => ({ default: module.CreateRoomPage })));

const LazyInfo = lazy(() => import('../../components/Info').then(module => ({ default: module.Info })));


export const RoutesAll = () => {
    const [roomCode, setRoomCode] = useState(null)

    useEffect(() => {
        const fetchRoomCode = async () => {
            try {
                const response = await fetch("/v1/user-in-room");
                if (!response.ok) {
                    throw new Error("Failed to fetch room data");
                }
                const data = await response.json();
                if (data.code != null) {
                    setRoomCode(data.code);
                } else {
                    setRoomCode(null);
                }
            } catch (error) {
                console.error(error); 
                setRoomCode(null); 
            }
        };
    
        fetchRoomCode();
    }, []);

    return (
        <>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        roomCode ? (
                            <Navigate to={`room/${roomCode}`} />
                        ) : (
                            <LazyHomePage />
                        )
                    }
                />
                <Route path="/join" element={<LazyRoomJoinPage />} />
                <Route path="/info" element={<LazyInfo />} />
                <Route path="/create" element={<LazyCreateRoomPage />} />
                <Route path="/room/:roomCode" element={<LazyRoom codeReset={roomCode} />} />
            </Routes>
        </>
    )
}