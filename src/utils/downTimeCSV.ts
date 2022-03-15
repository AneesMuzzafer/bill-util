import dayjs from "dayjs";
import { BillData, roundToTwo } from "../state/Bill";

const formatTimestamp = (ts: number) => {
    return dayjs(ts).format('DD-MM-YYYY hh:mm');
}

const formatInHours = (ts: number) => {
    return roundToTwo(ts / 3600000);
}

export const createDowmtimeString = (billdata: BillData[]) => {

    let csvString = "";

    billdata.forEach(item => {

        csvString = csvString.concat(item.id + "," + item.customerName + ",,,\n");
        let itemNo = 1;
        item.downtimes.forEach(ticket => {
            csvString = csvString.concat("," + itemNo + "," + formatTimestamp(ticket.startedAt) + "," + formatTimestamp(ticket.resolvedAt) + "," + formatInHours(ticket.resolvedAt - ticket.startedAt) + "\n")
            itemNo++;
        });
        csvString = csvString.concat(",,,Total," + formatInHours(item.downtime) + " hours\n");
        csvString = csvString.concat(",,,,\n");
    });

    return csvString;
}

