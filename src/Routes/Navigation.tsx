import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "../components/TopBar";
import NetworkEditor from "../screens/NetworkEditor";
import MainScreen from "../screens/MainScreen";
import { useAppDispatch } from "../state/hook";
import { updateNetwork } from "../state/links";
import MapTickets from "../screens/MapTickets";
import TrafficAffecting from "../screens/TrafficAffecting";
import BillData from "../screens/BillData";
import BillEditor from "../screens/BillItemEditor";
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
                <Route path="/map" element={<MapTickets />}>
                    {/* <Route path="/" element={<MapTickets />} /> */}
                </Route>
                <Route path="/traffic" element={<TrafficAffecting />} />
                <Route path="/billData" element={<BillData />} />
                <Route path="/links" element={<NetworkEditor />} />
                <Route path="/bills" element={<BillEditor />} />
                <Route path="/li" element={<div>abc</div>} />
            </Routes>
        </BrowserRouter>
    )
}