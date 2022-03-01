import React from "react";
import { processCsv, TicketObject } from "../utils/utils";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LinkRow from "../components/LinkRow";
// import { Input } from "@mui/material";



const UploadLinks = () => {


    const [linkFile, setLinkFile] = React.useState<object>({});
    const [linkArray, setLinkArray] = React.useState<TicketObject[]>([]);


    const handleLinkProcessing = async () => {
        const links = await processCsv(linkFile);
        setLinkArray(links);
    }

    // const Input = styled('input')({
    //     display: 'none',
    // });


    return (


        <Container maxWidth={false} >
            <LinkRow />
            <LinkRow />
            <LinkRow />
            <LinkRow />
        
        </Container>

        // <div>
        //     <input style={{display: "none"}} type="file" id="linkFileInput" onChange={(e) => {
        //         setLinkFile(() => {
        //             if (e.target.files) {
        //                 return e.target.files[0]
        //             }
        //         });
        //     }} />
        //     <Button variant="contained">Process the CSV</Button>

        //     <label htmlFor="contained-button-file">
        //         <input type="file" onChange={(e) => {
        //             setLinkFile(() => {
        //                 if (e.target.files) {
        //                     return e.target.files[0]
        //                 }
        //             });
        //         }} />
        //         {/* <Button variant="contained">
        //             Upload
        //         </Button> */}
        //         asdasdas asa sdasasdasda sd
        //     </label>
        //     <button onClick={handleLinkProcessing}>Process Csv</button>
        // </div>
    );

}

export default UploadLinks;