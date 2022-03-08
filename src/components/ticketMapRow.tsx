import React from "react";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { LinkData } from "../state/links";
import { Autocomplete, Button, TextField } from "@mui/material";
import { ParsedTicket } from "../state/parsedLinks";
import { useAppSelector } from "../state/hook";

interface ILinkRow {
    thisTicket: ParsedTicket;
    onSelect: (newValue: LinkData) => void;
}


const TicketMapRow: React.FC<ILinkRow> = ({ thisTicket, onSelect }) => {

    const networkArray: LinkData[] = useAppSelector(state => state.links);


    return (
        <Paper
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
                my: 2,
            }}
            variant="elevation"
            component="ul"
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                }}>
                <Chip label={thisTicket.id} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2 }} />
                <Chip label={thisTicket.linkname} color="primary" variant="filled" sx={{ fontWeight: "bold", marginRight: 2 }} />
                <Chip label={thisTicket.ticketDesc} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2 }} />
                {/* {conLinks && conLinks.map((name, index) => (
                    <li key={index} style={{ margin: 0, padding: 0 }}>
                        <Chip
                            sx={{ marginX: 0.5 }}
                            label={name}
                            color="primary"
                            variant="outlined"
                        // onDelete={() => handleDelete(data)}
                        />
                    </li>
                )
                )} */}
            </Box>
            <Box sx={{ display: "flex", padding: 0 }}>
                <Autocomplete
                    disablePortal
                    clearOnEscape
                    id="combo-box-demo"
                    options={networkArray}
                    sx={{ width: 300 }}
<<<<<<< HEAD
                    // onChange={(event, newValue: LinkData) => {
=======
                    value={networkArray[thisTicket.firstMatchRefIndex]}
                    // onChange={(event, newValue: LinkData | undefined) => {
>>>>>>> c1f64c0fab97199818034f54138c750a878bb6eb
                    //     newValue && onSelect(newValue);
                    // }}
                    renderInput={(params) => <TextField {...params} size="small" label="Link" />}
                />
                {/* <Button variant="contained" size="small" sx={{ mx: 2 }} 
                onClick={() => selectedLink && addLink(selectedLink)}
                >Add</Button> */}
            </Box>
        </Paper>
    );
}

export default TicketMapRow;