import React from "react";
import { processCsv, TicketObject } from "../utils/utils";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LinkRow, { Link } from "../components/LinkRow";
import UploadFileButton from "../components/UploadFileButton";
// import { Input } from "@mui/material";
import links, { LinkData, updateNetwork, updateOneLink } from "../state/links";
import { useAppDispatch, useAppSelector } from "../state/hook";
import { networkInterfaces } from "os";


const UploadLinks = () => {

    const getItems = () => {
        const dat = localStorage.getItem("links");
        return JSON.parse(dat as string);
    }

    const [linkArray, setLinkArray] = React.useState<LinkData[]>(getItems());
    // const [networkArray, setNetworkArray] = React.useState<Link[]>(getItems());



    const networkArray = useAppSelector(state => state.links);
    const dispatch = useAppDispatch();
    // console.log(networkArray);

    React.useEffect(() => {
        dispatch(updateNetwork(linkArray));
    }, []);


    const handleLinkProcessing = async (linkFile: File) => {
        const links = await processCsv(linkFile);
        let linkTypeCasted: LinkData[] = [];
        links.forEach((l) => {
            const lt: LinkData = {
                id: parseInt(l.id),
                label: l.label
            }
            linkTypeCasted.push(lt);
        })
        setLinkArray(linkTypeCasted);
    }

    const handleUpdate = () => {
        localStorage.setItem("links", JSON.stringify(networkArray));
    }

    const handlesate = () => {
        dispatch(updateNetwork(linkArray));
    }

    const handleUpdateLink = (link: Link, links: Link[]) => {

        let arr: number[] = [];
        links.forEach(l => arr.push(l.id));

        let updatedLink: LinkData = {
            id: link.id,
            label: link.label,
            connectedLinks: arr,
            alias: []
        }

        dispatch(updateOneLink(updatedLink));
        console.log("updated", networkArray);
    }


    return (
        <Container maxWidth={false} >
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <Box sx={{ width: "100%", height: "15vh", borderBottom: "solid 1px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box></Box>
                    <UploadFileButton handleProcessing={handleLinkProcessing} />
                    <Box>
                        <Button onClick={handleUpdate}>Update</Button>
                        <Button onClick={handlesate}>Save State</Button>
                    </Box>
                </Box>

                <Box sx={{ width: "100%" }}>
                    {
                        linkArray && linkArray.map((link, index) => {
                            
                            return <LinkRow key={index + "-" + link} links={linkArray} conLinks={ networkArray[index]?.connectedLinks} thisLink={link} onUpdateLink={handleUpdateLink} />
                        })
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