import { Button, Container } from "@mui/material";
import React from "react";
import TrafficAffectingRow from "../components/TrafficAffectingRow";
import { useAppDispatch, useAppSelector } from "../state/hook";
import { ParsedTicket, updateParsedState } from "../state/parsedLinks";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useNavigate } from "react-router-dom";

const LIGHTBLUE = "#d1e4f6";
const EVENLIGHTERBLUE = "#e8f1fb";
const WHITE = "#fff";

interface colorState {
    tk: ParsedTicket;
    color: string;
}

dayjs.extend(isBetween);

const TicketAffecting = () => {

    const parsedTickets = useAppSelector(state => state.parsedTickets);

    const [tickets, setTickets] = React.useState<ParsedTicket[]>(parsedTickets);
    const [colored, setColored] = React.useState<colorState[]>([]);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    React.useEffect(() => {
        let arr = parsedTickets.map(t => ({tk: t, color: WHITE}));
        setColored(arr);
    }, []);

    const handleChange = (tk: ParsedTicket) => {
        setTickets(p => {
            let s = [...p];
            let index = s.indexOf(tk);
            s[index] = { ...s[index], trafficAffected: !s[index].trafficAffected }
            return s
        });
    }

    const handlePress = (t: ParsedTicket) => {
        setColored(colorArray => {
            colorArray.forEach(item => {
                if (item.tk === t) {
                    item.color = LIGHTBLUE;
                } else {
                    if(dayjs(item.tk.ticketStartedAt).isBetween(dayjs(t.ticketStartedAt), dayjs(t.ticketResolvedAt), null, '[]')  && (dayjs(item.tk.ticketResolvedAt).isBetween(dayjs(t.ticketStartedAt), dayjs(t.ticketResolvedAt), null, '[]'))) {
                        item.color = EVENLIGHTERBLUE;
                    } else {
                        item.color = WHITE
                    }
                }
            })
            return colorArray;
        })
    }

    const handleCreate = () => {

        dispatch(updateParsedState(tickets));
        navigate("/billData");
    }

    return (
        <Container>
            <Button onClick={handleCreate}>Create Bill</Button>
            {
                tickets.map((ticket, index) => <TrafficAffectingRow key={ticket.id} thisTicket={ticket} color={colored[index]?.color || "#fff"} isAffecting={ticket.trafficAffected} handleChange={(t) => handleChange(t)} onPress={(t) => handlePress(t)} />)
            }
        </Container>
    );
}

export default TicketAffecting;