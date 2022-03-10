import React from "react";
import { useAppSelector } from "../state/hook";

const BillData = () => {

    const parsedTickets = useAppSelector(state => state.parsedTickets);

    console.log("inBillData", parsedTickets);

    return (
        <h1>Bismillah</h1>
    );
};

export default BillData;