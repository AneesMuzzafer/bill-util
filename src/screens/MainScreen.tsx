import React from "react";
import { processCsv, TicketObject } from "../utils/utils";

import Fuse from 'fuse.js'
import { links } from "../utils/links";
import UploadLinks from "../components/UploadLinks";
import { Box, Grid } from "@mui/material";
import { flexbox } from "@mui/system";



const doFuzzySearch = (ticketArray: TicketObject[], links: TicketObject[]) => {

    let sortedArray: any[] = [];
    let unSortedArray: any[] = [];

    const fuse = new Fuse(links, {
        keys: [
            {
                name: "Links",
                weight: 1
            }, {
                name: "Area",
                weight: 0.01
            }
        ],
        includeScore: true
    });

    console.log(ticketArray);
    let i = 0;
    ticketArray.forEach(ticket => {
        if (ticket.Title) {
            const clearedTitle = ticket.Title.replace(/ *\([^)]*\) */g, "");
            // const parsedLinks = clearedTitle.split(/[-;]+/);
            const parsedLinks = clearedTitle.split(/[-;/\\/]+/);

            parsedLinks.forEach((link: string) => {

                // const clearedLink = link.replace(/ *\([^)]*\) */g, "");

                const match = fuse.search(link.trim());
                if (match.length > 0) {
                    if (match[0].score! < 0.4) {
                        sortedArray.push({ link, matched: match[0].item.Links, score: match[0].score });
                        // console.log(link, "------", match, i++);
                    } else {
                        unSortedArray.push({ link, matches: [match[0].item.Links, match[1]?.item.Links] });
                    }

                } else {
                    console.log("No match found for", link)
                }
            });
            // console.log(parsedLinks);    
        } else {
            console.log(ticket)
        }

    });

    console.log(sortedArray);
    console.log(unSortedArray);

}

const MainScreen = () => {

    const [csvFile, setCsvFile] = React.useState<object>({});
    const [linkFile, setLinkFile] = React.useState<object>({});
    const [ticketArray, setTicketArray] = React.useState<TicketObject[]>([]);
    const [linkArray, setLinkArray] = React.useState<TicketObject[]>([]);




    const handleProcessing = async () => {
        const tickets = await processCsv(csvFile);
        setTicketArray(tickets);
    }

    const handleLinkProcessing = async () => {
        const links = await processCsv(linkFile);
        console.log(links);
        setLinkArray(links);
    }

    React.useEffect(() => {
        ticketArray && doFuzzySearch(ticketArray, linkArray);
    }, [ticketArray, linkArray]);

    return (
        <div className="App">
            <header style={{height: 100, backgroundColor: "black", color: 'white', textAlign: "center", fontSize: 24}} className="App-header">
                POWERGRID BILL UTILITY
            </header>

            <Grid container >
                <Grid xs={9} >
                    <Box sx={{ backgroundColor: "brown", width: "100%", height: "100vh" }}>
                        <input type="file" id="csvFileInput" onChange={(e) => {
                            setCsvFile(() => {
                                if (e.target.files) {
                                    return e.target.files[0]
                                }
                            });
                        }} />
                        <button onClick={handleProcessing}>Process Csv</button>
                    </Box>
                </Grid>
                <Grid xs={3} >
                    <Box sx={{ backgroundColor: "blue", width: "100%", height: "100vh" }}>

                    </Box>
                </Grid>
            </Grid>

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
        </div>
    );
}

export default MainScreen;