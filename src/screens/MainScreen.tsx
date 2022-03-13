import React from "react";
import { processCsv, TicketObject } from "../utils/utils";
import { Box, Container } from "@mui/material";
import UploadFileButton from "../components/UploadFileButton";
import { useAppSelector, useAppDispatch } from "../state/hook";
import { doFuzzySearch } from "../utils/fuzzySeach";
import { useNavigate } from "react-router-dom";
import { updateParsedState } from "../state/parsedLinks";

const MainScreen = () => {

    // const [csvFile, setCsvFile] = React.useState<object>({});
    // const [linkFile, setLinkFile] = React.useState<object>({});
    const [ticketArray, setTicketArray] = React.useState<TicketObject[]>([]);
    // const [linkArray] = React.useState<TicketObject[]>([]);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const networkArray = useAppSelector(state => state.links);
    // const parsedTickets = useAppSelector(state => state.parsedTickets);

    // const handleProcessing = async () => {
    //     const tickets = await processCsv(csvFile);
    //     setTicketArray(tickets);
    // }

    const handleTicketProcessing = async (ticketFile: File) => {
        const tickets = await processCsv(ticketFile);
        setTicketArray(tickets);
    }

    // console.log(ticketArray);

    React.useEffect(() => {
        if (ticketArray.length > 0 && networkArray) {
            // parsedResult = doFuzzySearch(ticketArray, networkArray);
            dispatch(updateParsedState(doFuzzySearch(ticketArray, networkArray)));
            navigate("/map");
        }
    }, [ticketArray, networkArray, navigate, dispatch]);

    // const gt = useAppSelector(state => getTotalDownTime(state));
    // console.log(gt);

    return (
        <Container >
            {/* <header style={{height: 100, backgroundColor: "black", color: 'white', textAlign: "center", fontSize: 24}} className="App-header">
                POWERGRID BILL UTILITY
            </header> */}
            <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ width: 500, height: 500, border: "solid 1px grey" }}>
                    <UploadFileButton handleProcessing={handleTicketProcessing} />
                </Box>
            </Box>

            {/* <input type="file" id="csvFileInput" onChange={(e) => {
                    setCsvFile(() => {
                        if (e.target.files) {
                            return e.target.files[0]
                        }
                    });
                }} />
                <button onClick={handleProcessing}>Process Csv</button> */}



            {/* <Box sx={{
                width: "75vw",
                height: "100vh",
                backgroundColor: "brown",
                display: "inline-block"
            }}>
                <input type="file" id="csvFileInput" onChange={(e) => {
                    setCsvFile(() => {
                        if (e.target.files) {
                            return e.target.files[0]
                        }
                    });
                }} />
                <button onClick={handleProcessing}>Process Csv</button>
            </Box>
            <Box  sx={{
                width: "25vw",
                height: "100vh",
                backgroundColor: "blue",
                display: "inline-block"
            }}>
asd
            </Box> */}

            {/* <input type="file" id="linkFileInput" onChange={(e) => {
                setLinkFile(() => {
                    if (e.target.files) {
                        return e.target.files[0]
                    }
                });
            }} />
            <button onClick={handleLinkProcessing}>Process Csv</button> */}
            {/* <UploadLinks /> */}
        </Container>
    );
}

export default MainScreen;