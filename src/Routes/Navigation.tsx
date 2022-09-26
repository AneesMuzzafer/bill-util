import React from "react";
import { HashRouter , Route, Routes } from "react-router-dom";
import TopBar from "../components/TopBar";
import NetworkEditor from "../screens/NetworkEditor";
import MainScreen from "../screens/MainScreen";
import { useAppDispatch } from "../state/hook";
import { updateNetwork } from "../state/links";
import MapTickets from "../screens/MapTickets";
import TrafficAffecting from "../screens/TrafficAffecting";
import BillData from "../screens/BillData";
import BillEditor from "../screens/BillItemEditor";
import { updateBillState } from "../state/Bill";
import BillDataEditor from "../screens/BillDataEditor";
import LoadJSON from "../screens/LoadJSON";
export default function Navigation() {

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        const dat = localStorage.getItem("links");
        dispatch(updateNetwork(JSON.parse(dat as string)));

        const bill = localStorage.getItem("bill");
        dispatch(updateBillState(JSON.parse(bill as string)));

    }, [dispatch]);

    return (
        <HashRouter>
            <TopBar />
            <Routes>
                <Route path="/" element={<MainScreen />} />
                <Route path="/map" element={<MapTickets />} />
                <Route path="/traffic" element={<TrafficAffecting />} />
                <Route path="/billData" element={<BillData />} />
                <Route path="/links" element={<NetworkEditor />} />
                <Route path="/bills" element={<BillEditor />} />
                <Route path="/load" element={<LoadJSON />} />
                <Route path="/itemEditor/:id" element={<BillDataEditor />} />
                <Route path="/li" element={<div>abc</div>} />
            </Routes>
        </HashRouter>
    )
}