import { processNetworkCsv } from "../utils/utils";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LinkRow from "../components/LinkRow";
import UploadFileButton from "../components/UploadFileButton";
import  { updateNetwork } from "../state/links";
import { useAppDispatch, useAppSelector } from "../state/hook";

const NetworkEditor = () => {

    const networkArray = useAppSelector(state => state.links);
    const dispatch = useAppDispatch();

    const handleLinkProcessing = async (linkFile: File) => {
        console.log("starting process")
        const linkData = await processNetworkCsv(linkFile);
        dispatch(updateNetwork(linkData));
        localStorage.setItem("links", JSON.stringify(linkData));
    }

    return (
        <Container maxWidth={false} >
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <Box sx={{ width: "100%", height: "15vh", borderBottom: "solid 1px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <UploadFileButton handleProcessing={handleLinkProcessing} />
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