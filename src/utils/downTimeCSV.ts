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
            csvString = csvString.concat("," + itemNo + "," + formatTimestamp(ticket.startedAt) + "," + formatTimestamp(ticket.resolvedAt) + "," + formatInHours(ticket.resolvedAt - ticket.startedAt) + " hours\n")
            itemNo++;
        });
        csvString = csvString.concat(",,,Total," + formatInHours(item.downtime) + " hours\n");
        csvString = csvString.concat(",,,,\n");
    });

    return csvString;
}

export const createBillSummaryString = (billdata: BillData[], total: number) => {

    let csvString = "id, Customer Name, CP Number, Capacity, Link From, Link To, Doco, Last Mile Type, Annual Invoice Value, Share Percent, Unit Rate, Number Of Days, Downtime, Uptime Percent, Penalty Slab, Penalty in Hours, Amount (excluding GST)\n";

    billdata.forEach(item => {

        csvString = csvString.concat(item.id + ","
            + item.customerName + ","
            + item.cpNumber + ","
            + item.capacity + ","
            + item.linkFrom + ","
            + item.linkTo + ","
            + item.doco + ","
            + item.lastMile + ","
            + item.annualInvoiceValue + ","
            + item.sharePercent + ","
            + item.unitRate + ","
            + item.numberOfDays + ","
            + item.downtime + ","
            + item.uptimePercent + ","
            + item.penaltySlab + ","
            + item.penaltyHours + ","
            + item.amount + "\n");
    });
    csvString = csvString.concat(",,,,,,,,,,,,,,,Total (excluding GST),Rs " + (total) + "\n");
    csvString = csvString.concat(",,,,,,,,,,,,,,,GST Amount,Rs " + roundToTwo(total * 0.18) + "\n");
    csvString = csvString.concat(",,,,,,,,,,,,,,,Total (With GST),Rs " + roundToTwo(total * 1.18) + "\n");
    
    return csvString;
}

