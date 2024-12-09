import React, { lazy, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const LazyHomePage = lazy(() =>
  import("../../pages/HomePage").then((module) => ({
    default: module.HomePage,
  }))
);

const LazyRoomJoinPage = lazy(() =>
  import("../../pages/RoomJoinPage").then((module) => ({
    default: module.RoomJoinPage,
  }))
);

const LazyRoom = lazy(() =>
  import("../../pages/Room").then((module) => ({ default: module.Room }))
);

const LazyCreateRoomPage = lazy(() =>
  import("../../pages/CreateRoomPage").then((module) => ({
    default: module.CreateRoomPage,
  }))
);

const LazyInfoPage = lazy(() =>
  import("../../components/Info").then((module) => ({
    default: module.Info,
  }))
);

export const RoutesAll = () => {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    const fetchRoomCode = async () => {
      try {
        const response = await fetch("/v1/user-in-room");
        const data = await response.json();
        setRoomCode(data.code);
        console.log(data.code);
      } catch (error) {
        console.error("Error fetching room code: ", error);
      }
    };

    fetchRoomCode();
  }, []);

  const clearRoomCode = () => {
    setRoomCode(null);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            roomCode ? <Navigate to={`room/${roomCode}`} /> : <LazyHomePage />
          }
        />
        <Route path="/join" element={<LazyRoomJoinPage />} />
        <Route path="/create" element={<LazyCreateRoomPage />} />
        <Route path="/info" element={<LazyInfoPage />} />
        <Route
          path="/room/:roomCode"
          element={<LazyRoom codeReset={clearRoomCode} />}
        />
      </Routes>
    </>
  );
};
