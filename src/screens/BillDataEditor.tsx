import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../state/hook";

const BillDataEditor = () => {

    const params = useParams();

    const index = parseInt(params.id || "0") - 1;

    const billDataItem = useAppSelector(state => state.billItems[index]);

    return (
        <h1>
            {billDataItem.customerName}
        </h1>
    );
}

export default BillDataEditor;