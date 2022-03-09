import { Button, Container } from "@mui/material";
import React from "react";
import TrafficAffectingRow from "../components/TrafficAffectingRow";
import { useAppSelector } from "../state/hook";
import { ParsedTicket } from "../state/parsedLinks";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

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

    
    const [selected, setSelected] = React.useState<ParsedTicket>(parsedTickets[0]);

    React.useEffect(() => {
        let arr = parsedTickets.map(t => ({tk: t, color: WHITE}));
        setColored(arr);
    }, []);


    // console.log(colored)

    const handleChange = (tk: ParsedTicket) => {
        setTickets(p => {
            let s = [...p];
            let index = s.indexOf(tk);
            s[index] = { ...s[index], trafficAffected: !s[index].trafficAffected }
            return s
        });
    }

    // console.log(selected)

    const handlePress = (t: ParsedTicket) => {
        // console.log("handlePress");
        setColored(colorArray => {
            colorArray.forEach(item => {
                if (item.tk === t) {
                    item.color = LIGHTBLUE;
                } else {
                    // dayjs('2016-10-30').isBetween('2016-01-01', '2016-10-30', null, '[)')
                    if(dayjs(item.tk.ticketStartedAt).isBetween(dayjs(t.ticketStartedAt), dayjs(t.ticketResolvedAt), null, '[]')  && (dayjs(item.tk.ticketResolvedAt).isBetween(dayjs(t.ticketStartedAt), dayjs(t.ticketResolvedAt), null, '[]'))) {
                        item.color = EVENLIGHTERBLUE;
                    } else {
                        item.color = WHITE
                    }
                }
            })

            return colorArray;
        })
        setSelected(t);
    }

    return (
        <Container>
            <Button onClick={() => handleChange(tickets[0])}>PLAY</Button>
            {
                tickets.map((ticket, index) => <TrafficAffectingRow key={ticket.id} thisTicket={ticket} color={colored[index]?.color || "#fff"} isAffecting={ticket.trafficAffected} handleChange={(t) => handleChange(t)} onPress={(t) => handlePress(t)} />)
            }
        </Container>
    );
}

export default TicketAffecting;