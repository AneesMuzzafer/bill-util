import React from "react";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import { LinkData } from "../state/links";
import { Autocomplete, TextField } from "@mui/material";
import { ParsedTicket } from "../state/parsedLinks";
import { useAppSelector } from "../state/hook";
import dayjs from 'dayjs';


interface ITARProps {
    thisTicket: ParsedTicket;
    color: string;
    isAffecting: boolean;
    handleChange: (thisTicket: ParsedTicket) => void;
    onPress: (thisTicket: ParsedTicket) => void;
}

const TrafficAffectingRow: React.FC<ITARProps> = ({ thisTicket, color, isAffecting, handleChange, onPress }) => {

    const sd= dayjs(thisTicket.ticketStartedAt).format("DD/MM/YYYY hh:mm A");
    const cd= dayjs(thisTicket.ticketResolvedAt).format("DD/MM/YYYY hh:mm A");
    const dif= dayjs(thisTicket.ticketResolvedAt).diff(dayjs(thisTicket.ticketStartedAt), "hour" , true).toFixed(3);

    
    return (
        <div>
            <Paper
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1,
                    my: 2,
                    backgroundColor: color
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
                    <Chip label={thisTicket.id} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2, width: 50}} />
                    <Chip label={thisTicket.linkname} color="primary" variant="filled" sx={{ fontWeight: "bold", marginRight: 2, width: 200 }} />
                    <Chip label={thisTicket.ticketDesc} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2 }} />
                    <Chip label={sd + " - " + cd} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2 }} />
                    <Chip label={dif + " hours"} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2 }} />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", padding: 0 }}>
                    <div onClick={() => onPress(thisTicket)} style={{width: 30, height: 30, border: "solid 1px grey", marginRight: 10}}/>
                    <Switch
                        checked={isAffecting}
                        onChange={() => handleChange(thisTicket)}
                        // inputProps={{ 'aria-label': 'controlled' }}
                    />
                    {/* <Autocomplete
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
                /> */}
                </Box>
            </Paper>
        </div>
    )
}

export default TrafficAffectingRow;