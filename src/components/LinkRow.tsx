import React from "react";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';


export interface Link {
    id: number;
    label: string;
}


const LinkRow: React.FC<{links: Link[], thisLink: Link}> = ({links, thisLink}) => {

    const [connectedLinks, setconnectedLinks] = React.useState<Link[]>([]);

    const [selectedLink, setSelectedLink] = React.useState<Link>(thisLink);

    // const [links, setLinks] = React.useState<Link[]>([
    //     { key: 0, label: 'Angular' },
    //     { key: 1, label: 'jQuery' },
    //     { key: 2, label: 'Polymer' },
    //     { key: 3, label: 'React' },
    //     { key: 4, label: 'Vue.js' },
    // ]);

    
    const addLink = (link: Link) => {
        if (!link) return;

        if (connectedLinks.includes(link)) {
            console.log("link already present")
            return;
        }

        setconnectedLinks(prevLinks => [...prevLinks, link]);
    }

    const handleDelete = (linkToDelete: Link) => { setconnectedLinks((prevlinks) => prevlinks.filter(link => link.id !== linkToDelete.id)); };

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
                <Chip label={thisLink.id} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2 }} />
                <Chip label={thisLink.label} color="primary" variant="filled" sx={{ fontWeight: "bold", marginRight: 2 }} />
                {connectedLinks.map((data) => (
                    <li key={data.id} style={{ margin: 0, padding: 0 }}>
                        <Chip
                            sx={{ marginX: 0.5 }}
                            label={data.label}
                            color="primary"
                            variant="outlined"
                            onDelete={() => handleDelete(data)}
                        />
                    </li>
                )
                )}
            </Box>
            <Box sx={{ display: "flex", padding: 0 }}>
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
            </Box>
        </Paper>
    );
}

export default LinkRow;