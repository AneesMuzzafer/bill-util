import React from "react";
import { processCsv, TicketObject } from "../utils/utils";
import { Box, Container } from "@mui/material";
import UploadFileButton from "../components/UploadFileButton";
import { useAppSelector, useAppDispatch } from "../state/hook";
import { doFuzzySearch } from "../utils/fuzzySeach";
import { useNavigate } from "react-router-dom";
import { updateParsedState } from "../state/parsedLinks";
import StepperComponent from "../components/StepperComponent";

const MainScreen = () => {

    const [ticketArray, setTicketArray] = React.useState<TicketObject[]>([]);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const networkArray = useAppSelector(state => state.links);
    
    const handleTicketProcessing = async (ticketFile: File) => {
        const tickets = await processCsv(ticketFile);
        setTicketArray(tickets);
    }

    React.useEffect(() => {
        if (ticketArray.length > 0 && networkArray) {
            dispatch(updateParsedState(doFuzzySearch(ticketArray, networkArray)));
            navigate("/map");
        }
    }, [ticketArray, networkArray, navigate, dispatch]);

    return (
        <Container >
            <StepperComponent step={0} completed={false}/>
            <Box sx={{ height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ width: 500, height: 500, border: "solid 1px grey" }}>
                    <UploadFileButton handleProcessing={handleTicketProcessing} />
                </Box>
            </Box>
        </Container>
    );
}

export default MainScreen;