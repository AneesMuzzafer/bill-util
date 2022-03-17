import React from "react";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { LinkData } from "../state/links";
import { Autocomplete, TextField } from "@mui/material";
import { ParsedTicket } from "../state/parsedLinks";
import { useAppSelector } from "../state/hook";

interface ILinkRow {
    thisTicket: ParsedTicket;
    onSelect: (ticket: ParsedTicket, newRefIndex: number) => void;
    unmatched?: boolean;
}


const TicketMapRow: React.FC<ILinkRow> = ({ thisTicket, onSelect, unmatched = false }) => {

    const networkArray: LinkData[] = useAppSelector(state => state.links);
    const [selected, setSelected] = React.useState<LinkData>(!unmatched ? networkArray[thisTicket.firstMatchRefIndex] : networkArray[1]);


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
            <Chip label={thisTicket.id} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2 }} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                }}>
                <Chip label={thisTicket.ticketDesc} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2 }} />
                <Chip label={thisTicket.linkname} color="primary" variant="filled" sx={{ fontWeight: "bold", marginRight: 2 }} />
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
                <Box sx={{ display: "flex", padding: 0 }}>
                    <Autocomplete
                        disablePortal
                        clearOnEscape
                        id="combo-box-demo"
                        options={networkArray}
                        sx={{ width: 300 }}
                        value={selected}
                        onChange={(event, newValue: LinkData | null) => {
                            newValue && setSelected(newValue);
                            newValue && onSelect(thisTicket, networkArray.indexOf(newValue));
                        }}
                        renderInput={(params) => <TextField {...params} size="small" label="Link" />}
                    />
                    {/* <Button variant="contained" size="small" sx={{ mx: 2 }} 
                onClick={() => selectedLink && addLink(selectedLink)}
                >Add</Button> */}
                </Box>
            </Box>
        </Paper>
    );
}

export default TicketMapRow;