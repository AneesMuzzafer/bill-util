import React from "react";
import { useAppSelector } from "../state/hook";

const TicketAffecting = () => {

    const parsedTickets = useAppSelector(state => state.parsedTickets);
    console.log(parsedTickets);

    return (<p>Welcome</p>);
}

export default TicketAffecting;