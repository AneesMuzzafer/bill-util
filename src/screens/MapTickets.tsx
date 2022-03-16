import React from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import TicketMapRow from "../components/ticketMapRow";
import { useAppDispatch, useAppSelector } from "../state/hook";
import { ParsedTicket, updateCompleteFlag, updateOneTicket } from "../state/parsedLinks";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import StepperComponent from "../components/StepperComponent";

const MapTickets = () => {

    const parsedLinks = useAppSelector(state => state.parsedTickets);
    const [stage, setStage] = React.useState("matched");

    const completeMatchedLinks = parsedLinks.filter(l => l.partialMatch && l.completeMatch);
    const partialMatchedLinks = parsedLinks.filter(l => l.partialMatch && !l.completeMatch);
    const unmatchedLinks = parsedLinks.filter(l => !l.partialMatch && !l.completeMatch);

    const [linkArray, setLinkArray] = React.useState<ParsedTicket[]>(completeMatchedLinks);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSelect = (ticket: ParsedTicket, newRefIndex: number) => {
        dispatch(updateOneTicket({ ticket, networkIndex: newRefIndex }));
        setLinkArray(p => {
            let index = p.indexOf(ticket);
            p[index] = {...p[index], completeMatch: true}
            return p
        });
    }

    const handleUpdate = () => {
        let flag: boolean;
        switch (stage) {
            case "matched":
                flag = true;
                linkArray.forEach(l => {
                    if (!l.completeMatch) {
                        flag = false;
                    }
                });
                if (!flag) break;
                dispatch(updateCompleteFlag(completeMatchedLinks));
                setLinkArray(partialMatchedLinks);
                setStage("partial");
                break;
            case "partial":

                flag = true;
                linkArray.forEach(l => {
                    if (!l.completeMatch) {
                        flag = false;
                    }
                });
                // if (!flag) {
                //     alert("Match All links first");
                //     break;
                // };
                dispatch(updateCompleteFlag(partialMatchedLinks));
                setLinkArray(unmatchedLinks);
                setStage("unmatched");
                break;
            case "unmatched":
                flag = true;
                linkArray.forEach(l => {
                    if (!l.completeMatch) {
                        flag = false;
                    }
                });
                // if (!flag) {
                //     alert("Match All links first");
                //     break;
                // };
                dispatch(updateCompleteFlag(unmatchedLinks));
                navigate("/traffic");
                break;
        }
    }

    const renderTable = () => {
        switch (stage) {
            case "matched":
                return (
                    <Paper sx={{ maxHeight: "75vh", overflowY: "scroll" }}>
                        <Typography>Matched Links</Typography>
                        {completeMatchedLinks.map((link, index) =>
                            <TicketMapRow key={index} thisTicket={link} onSelect={handleSelect} />
                        )}
                    </Paper >
                )
            case "partial":
                return (
                    <Paper sx={{ maxHeight: "75vh", overflowY: "scroll" }}>
                        <Typography>Partially Matched Links</Typography>
                        {partialMatchedLinks.map((link, index) =>
                            <TicketMapRow key={index} thisTicket={link} onSelect={handleSelect} />
                        )}
                    </Paper >
                )
            case "unmatched":
                return (
                    <Paper sx={{ maxHeight: "75vh", overflowY: "scroll" }}>
                        <Typography>Unmatched Links</Typography>
                        {unmatchedLinks.map((link, index) =>
                            <TicketMapRow key={index} thisTicket={link} onSelect={handleSelect} unmatched />
                        )}
                    </Paper >
                )
        }
    }

    return (
        <Container sx={{ display: "flex", flexDirection: "column" }}>
            <StepperComponent step={1} />
            <Typography>Total Links = {parsedLinks.length}</Typography>
            <Typography>Total Links Matched = {completeMatchedLinks.length}</Typography>
            <Typography>Total Links Partially Matched = {partialMatchedLinks.length}</Typography>
            <Typography>Total Links UnMatched = {unmatchedLinks.length}</Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", marginY: 4 }}>
                <Button variant="contained" sx={{ width: 20 }} onClick={handleUpdate}>Update</Button>
            </Box>
            {renderTable()}
        </Container >
    );
}

export default MapTickets;