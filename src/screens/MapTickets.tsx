import { Container } from "@mui/material";
import TicketMapRow from "../components/ticketMapRow";
import { useAppSelector } from "../state/hook";

const MapTickets = () => {

    const parsedLinks = useAppSelector(state => state.parsedTickets);

    const completeMatchedLinks = parsedLinks.filter(l => l.partialMatch && l.completeMatch);
    const partialMatchedLinks = parsedLinks.filter(l => l.partialMatch && !l.completeMatch);
    const unmatchedLinks = parsedLinks.filter(l => !l.partialMatch && !l.completeMatch);

    console.log(completeMatchedLinks, partialMatchedLinks, unmatchedLinks);

    return (
        <Container sx={{ display: "flex", flexDirection: "column" }}>
            {parsedLinks.map((link, index) =>
                <TicketMapRow key={index} thisTicket={link} onSelect={() => alert("selected" + link.linkname)} />
            )}
        </Container>
    );
}

export default MapTickets;