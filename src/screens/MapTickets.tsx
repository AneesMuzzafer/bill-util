import { Container } from "@mui/material";
import { useAppSelector } from "../state/hook";

const MapTickets = () => {

    const parsedLinks = useAppSelector(state => state.parsedTickets);

    return (
    <Container sx={{display: "flex"}}>
        <p>Welcome</p>
    </Container>
    );
}

export default MapTickets;