import React from "react";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { LinkData } from "../state/links";


export interface Link {
    id: number;
    label: string;
}

interface ILinkRow {
    thisLink: LinkData;
    conLinks: string[] | undefined;
}


const LinkRow: React.FC<ILinkRow> = ({ thisLink, conLinks }) => {
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
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: "center",
                    flexWrap: 'wrap',
                    listStyle: 'none',
                }}>
                <Box sx={{ display: "flex", flex: 3 }}>
                    <Chip label={thisLink.id} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2 }} />
                    <Chip label={thisLink.label} color="primary" variant="filled" sx={{ fontWeight: "bold", marginRight: 2 }} />
                </Box>
                <Box sx={{ display: "flex", flex: 7, justifyContent: "flex-start" }}>
                    <Chip label={thisLink.lm} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2, width: 100 }} />
                    {thisLink.cps && thisLink.cps.map((no, index) => (
                        no !== -1 && <li key={index} style={{ margin: 0, padding: 0 }}>
                            <Chip
                                sx={{ marginX: 0.5 }}
                                label={no}
                                color="primary"
                                variant="outlined"
                            />
                        </li>
                    )
                    )}
                    {/* {conLinks && conLinks.map((name, index) => (
                    <li key={index} style={{ margin: 0, padding: 0 }}>
                        <Chip
                            sx={{ marginX: 0.5 }}
                            label={name}
                            color="primary"
                            variant="outlined"
                        />
                    </li>
                )
                )} */}
                </Box>
            </Box>
            {/* <Box sx={{ display: "flex", padding: 0 }}>
                <Autocomplete
                    disablePortal
                    clearOnEscape
                    id="combo-box-demo"
                    options={links}
                    sx={{ width: 300 }}
                    onChange={(event, newValue: Link | null) => {
                        newValue && setSelectedLink(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} size="small" label="Link" />}
                />
                <Button variant="contained" size="small" sx={{ mx: 2 }} onClick={() => selectedLink && addLink(selectedLink)}>Add</Button>
            </Box> */}
        </Paper>
    );
}

export default LinkRow;