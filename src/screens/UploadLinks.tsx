import React from "react";
import { processCsv, TicketObject } from "../utils/utils";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LinkRow, { Link } from "../components/LinkRow";
import UploadFileButton from "../components/UploadFileButton";
// import { Input } from "@mui/material";



const UploadLinks = () => {


    const jsonData = { name: "Anees", age: 21 };

    // const handleSaveToPC = () => {
    //     // const fileData = JSON.stringify(jsonData);
    //     // const blob = new Blob([fileData], {type: "text/plain"});
    //     // const url = URL.createObjectURL(blob);
    //     // const link = document.createElement('a');
    //     // link.download = 'filename.json';
    //     // link.href = url;
    //     // link.click();
    //     localStorage.setItem("links", JSON.stringify(connectedLinks));
    // }

    
    const getItems = () => {
        const dat = localStorage.getItem("links");
        return JSON.parse(dat as string);
    }
    
    const [linkArray, setLinkArray] = React.useState<Link[]>(getItems());
    

    const handleLinkProcessing = async (linkFile: File) => {
        const links = await processCsv(linkFile);
        let linkTypeCasted: Link[] = [];
        links.forEach((l) => {
            const lt: Link = {
                id: parseInt(l.id),
                label: l.label
            }
            linkTypeCasted.push(lt);
        })
        setLinkArray(linkTypeCasted);
    }

    return (


        <Container maxWidth={false} >
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <Box sx={{ width: "100%", height: "15vh", borderBottom: "solid 1px", justifyContent: "space-between" }}>
                    <UploadFileButton handleProcessing={handleLinkProcessing} />
                </Box>

                <Box sx={{ width: "100%" }}>
                    {
                        linkArray.map((link, index) => {
                            return <LinkRow key={index} links={linkArray} thisLink={link}/>
                        } )
                    }
                </Box>
            </Box>
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