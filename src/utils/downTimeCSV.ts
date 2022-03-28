import dayjs from "dayjs";
import { BillData, roundToTwo } from "../state/Bill";
import { LinkData } from "../state/links";

const formatTimestamp = (ts: number) => {
    return dayjs(ts).format('DD-MM-YYYY hh:mm');
}

const formatInHours = (ts: number) => {
    return roundToTwo(ts / 3600000);
}

const romanize = (num: number) => {
    if (!+num) return false;
    var digits = String(+num).split('');
    var key = ['', 'c', 'cc', 'ccc', 'cd', 'd', 'dc', 'dccc', 'dcccc', 'cm',
        '', 'x', 'xx', 'xxx', 'xl', 'l', 'lx', 'lxx', 'lxxx', 'xc',
        '', 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix'];
    var roman = '', i = 3;
    while (i--) {
        let d = digits.pop();
        if (d) {
            roman = (key[+d + (i * 10)] || '') + roman;
        }
    }

    return Array(+digits.join('') + 1).join('M') + roman;
}

export const getSlab = (slab: number) => {
    switch (slab) {
        case 0:
            return " ×1";
        case 1:
            return " ×1.25";
        case 2:
            return " ×1.5";
        case 3:
            return " ×1.75";
        case 4:
            return " ×2";
        case 5:
            return " ×2.25";
        case 6:
            return " ×2.5";
        case 7:
            return " ×3";
        default:
            return " ×1";
    }
}

export const createDowmtimeString = (billdata: BillData[]) => {

    let csvString = "";

    billdata.forEach(item => {

        csvString = csvString.concat(item.id + "," + item.customerName + ",,,,\n");
        let itemNo = 1;
        item.downtimes.forEach(ticket => {
            csvString = csvString.concat(",," + romanize(itemNo) + ".," + formatTimestamp(ticket.startedAt) + "," + formatTimestamp(ticket.resolvedAt) + "," + formatInHours(ticket.resolvedAt - ticket.startedAt) + " hours\n")
            itemNo++;
        });
        csvString = csvString.concat(",,,,Total," + formatInHours(item.downtime) + " hours\n");
        csvString = csvString.concat(",,,,,\n");
    });

    return csvString;
}

export const createBillSummaryString = (billdata: BillData[], total: number) => {

    let csvString = "id, Customer Name, CP Number, Capacity, Link From, Link To, Doco, Last Mile Type, Annual Invoice Value, Sanguine Share Percent, Unit Rate, Number Of Days, Downtime, Uptime Percent, Penalty Slab, Penalty in Hours, Penalty Amount, Amount (excluding GST)\n";

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
            + formatInHours(item.downtime) + ","
            + item.uptimePercent + ","
            + getSlab(item.penaltySlab) + ","
            + item.penaltyHours + ","
            + roundToTwo((item.unitRate / 24) * (item.penaltyHours)) + ","
            + item.amount + "\n");
    });
    csvString = csvString.concat(",,,,,,,,,,,,,,,,Total (excluding GST),Rs " + (total) + "\n");
    csvString = csvString.concat(",,,,,,,,,,,,,,,,GST Amount,Rs " + roundToTwo(total * 0.18) + "\n");
    csvString = csvString.concat(",,,,,,,,,,,,,,,,Total (With GST),Rs " + roundToTwo(total * 1.18) + "\n");

    return csvString;
}

export const createNetworkString = (networkArray: LinkData[]) => {
    let csvString = "id, label, region, cps, lm, connectedLinks, alias\n";

    networkArray.forEach(link => {
        console.log(link)
        csvString = csvString.concat(link.id + ","
            + link.label + ","
            + link.region + ","
            + listGenerator(link.cps) + ","
            + link.lm + ","
            + listGenerator(link.connectedLinks) + ","
            + listGenerator(link.alias) + "\n"
        );
    });

    return csvString;
}

const listGenerator = (arr: string[] | number[] | undefined) => {
    let str = "";
    if (arr)
        arr.forEach((a, i) => {
            str = str.concat(a as string);
            if (i !== arr.length - 1) {
                str = str.concat(";");
            }
        });
    return str;
}
