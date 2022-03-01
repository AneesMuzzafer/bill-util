import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "../components/TopBar";
import UploadLinks from "./UploadLinks";
import MainScreen from "./MainScreen";

export default function Navigation() {
    return (
        <BrowserRouter>
            <TopBar />
            <Routes>
                <Route path="/" element={<MainScreen />} />
                <Route path="/links" element={<UploadLinks />} />
            </Routes>
        </BrowserRouter>
    )
}