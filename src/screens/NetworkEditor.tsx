import { processNetworkCsv } from "../utils/utils";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LinkRow from "../components/LinkRow";
import UploadFileButton from "../components/UploadFileButton";
import { updateNetwork } from "../state/links";
import { useAppDispatch, useAppSelector } from "../state/hook";
import { Button } from "@mui/material";
import { CSVLink } from "react-csv";
import { createNetworkString } from "../utils/downTimeCSV";

const NetworkEditor = () => {

    const networkArray = useAppSelector(state => state.links);
    const dispatch = useAppDispatch();

    const handleLinkProcessing = async (linkFile: File) => {
        const linkData = await processNetworkCsv(linkFile);
        dispatch(updateNetwork(linkData));
        localStorage.setItem("links", JSON.stringify(linkData));
    }

    return (
        <Container maxWidth={false} >
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <Box sx={{ width: "100%", height: "15vh", borderBottom: "solid 1px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <UploadFileButton handleProcessing={handleLinkProcessing} />
                    <CSVLink filename={`network-${new Date()}.csv`} style={{ textDecorationLine: "none", marginRight: 20 }} data={createNetworkString(networkArray)}>
                        <Button variant="outlined" >Download Network</Button>
                    </CSVLink>
                </Box>
                <Box sx={{ width: "100%" }}>
                    {
                        networkArray && networkArray.map((link) => {
                            return <LinkRow key={link.id} conLinks={link.connectedLinks} thisLink={link} />
                        })
                    }
                </Box>
            </Box>
        </Container>
    );

}

export default NetworkEditor;