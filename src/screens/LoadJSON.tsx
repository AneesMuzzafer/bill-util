import React from "react";
import { processCsv, processJSON, TicketObject } from "../utils/utils";
import { Box, Container } from "@mui/material";
import UploadFileButton from "../components/UploadFileButton";
import { useAppSelector, useAppDispatch } from "../state/hook";
import { doFuzzySearch } from "../utils/fuzzySeach";
import { useNavigate } from "react-router-dom";
import { updateParsedState } from "../state/parsedLinks";
import StepperComponent from "../components/StepperComponent";
import { updateBillState } from "../state/Bill";

const LoadJSON = () => {

    // const [ticketArray, setTicketArray] = React.useState<TicketObject[]>([]);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const bill = localStorage.getItem("bill");

    const handleJSONProcessing = async (jsonFile: File) => {
        if (bill) {
            const billData = await processJSON(jsonFile, JSON.parse(bill));
            dispatch(updateBillState(billData));
            navigate("/billData");
        } else {
            console.log("Please upload a basic bill")
        }

    }

    return (
        <Container >
            Load from JSON
            <Box sx={{ height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ width: 500, height: 500, border: "solid 1px grey" }}>
                    <UploadFileButton handleProcessing={handleJSONProcessing} />
                </Box>
            </Box>
        </Container>
    );
}

export default LoadJSON;