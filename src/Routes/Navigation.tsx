import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "../components/TopBar";
import NetworkEditor from "../screens/NetworkEditor";
import MainScreen from "../screens/MainScreen";
import { useAppDispatch } from "../state/hook";
import { updateNetwork } from "../state/links";
import MapTickets from "../screens/MapTickets";

export default function Navigation() {

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        const dat = localStorage.getItem("links");
        dispatch(updateNetwork(JSON.parse(dat as string)));

    }, [dispatch]);

    return (
        <BrowserRouter>
            <TopBar />
            <Routes>
                <Route path="/" element={<MainScreen />} />
                <Route path="/map" element={<MapTickets />} />
                <Route path="/links" element={<NetworkEditor />} />
                <Route path="/li" element={<div>abc</div>} />
            </Routes>
        </BrowserRouter>
    )
}