import { LinkData } from "../state/links";
import { BillData } from "../state/Bill";
export interface TicketObject {
    [key: string]: string;
}

export interface NetworkObject {
    [key: string]: string;
}


export const processCsv = async (csvFile: object): Promise<TicketObject[]> => {
    const promise = new Promise<TicketObject[]>((res, rej) => {
        let ticketArray: TicketObject[] = [];
        const reader = new FileReader();

        reader.readAsText(csvFile as Blob);
        reader.onload = (e) => {
            const data = e.target?.result?.toString();

            if (data) {
                const headers = data.slice(0, data.indexOf("\n")).replace(/['"]+/g, '').slice(0, -1).split(",");
                const rows = data?.slice(data.indexOf("\n") + 1, -1).split("\n");

                ticketArray = rows.map(row => {

                    const ticket: TicketObject = {};
                    const ticketFields = row.replace(/['"]+/g, '').split(",");
                    headers.forEach((header, index) => {
                        ticket[header] = ticketFields[index];
                    });
                    return ticket;
                });
            }

            res(ticketArray);
        }
    });
    return promise;
}

//sdfgdfgsd

export const processNetworkCsv = async (csvFile: object): Promise<LinkData[]> => {
    const promise = new Promise<LinkData[]>((res, rej) => {
        let linkDataArray: LinkData[] = [];
        const reader = new FileReader();

        reader.readAsText(csvFile as Blob);
        reader.onload = (e) => {
            const data = e.target?.result?.toString();

            if (data) {
                // const headers = data.slice(0, data.indexOf("\n")).replace(/['"]+/g, '').slice(0, -1).split(",");

                // let flag = true;
                // headers.forEach(header => {
                //     if (["id", "label", "region", "lm", "connectedLinks", "alias"].includes(header)) {
                //         console.log("Correct Data");
                //     }
                //     else {
                //         console.log("Wrong Data");
                //         flag = false;
                //         return;
                //     }
                // }
                // );

                // if (!flag) return;

                const rows = data?.slice(data.indexOf("\n") + 1, -1).split("\n");

                linkDataArray = rows.map(row => {
                    const linkFields = row.replace(/['"]+/g, '').split(",");
                    return {
                        id: parseInt(linkFields[0]),
                        label: linkFields[1],
                        region: linkFields[2],
                        cps: linkFields[3]?.split(";").map(item => parseInt(item, 10)),
                        lm: linkFields[4],
                        connectedLinks: linkFields[5] === "" ? [] : linkFields[5]?.split(";"),
                        alias: linkFields[6] === "\r" ? [] : linkFields[6]?.split(";"),
                    }
                });
            }

            res(linkDataArray);
        }
    });
    return promise;
}


export const processBillCsv = async (csvFile: object): Promise<BillData[]> => {
    const promise = new Promise<BillData[]>((res, rej) => {
        let billDataArray: BillData[] = [];
        const reader = new FileReader();

        reader.readAsText(csvFile as Blob);
        reader.onload = (e) => {
            const data = e.target?.result?.toString();

            if (data) {
                const rows = data?.slice(data.indexOf("\n") + 1, -1).split("\n");

                billDataArray = rows.map(row => {
                    const linkFields = row.replace(/['"]+/g, '').split(",");
                    return {
                        id: parseInt(linkFields[0]),
                        customerName: linkFields[1],
                        cpNumber: parseInt(linkFields[2]),
                        capacity: linkFields[3],
                        linkFrom: linkFields[4],
                        linkTo: linkFields[5],
                        doco: linkFields[6],
                        lastMile: linkFields[7],
                        annualInvoiceValue: parseFloat(linkFields[8]),
                        sharePercent: parseFloat(linkFields[9]),
                        discountOffered: parseFloat(linkFields[10]),
                        annualVendorValue: parseFloat(linkFields[11]),
                        unitRate: parseFloat(linkFields[12]),
                        numberOfDays: parseInt(linkFields[13]),
                        downtime: parseFloat(linkFields[14]),
                        uptimePercent: parseFloat(linkFields[15]),
                        penaltySlab: parseInt(linkFields[16]),
                        penaltyHours: parseFloat(linkFields[17]),
                        amount: parseFloat(linkFields[18]),
                        downtimes: [],
                    }
                });
            }

            res(billDataArray);
        }
    });
    return promise;
}

export const processJSON = async (jsonFile: object, bill: BillData[]): Promise<BillData[]> => {
    const promise = new Promise<BillData[]>((res, rej) => {
        let billDataArray: BillData[] = [];
        const reader = new FileReader();

        reader.readAsText(jsonFile as Blob);
        reader.onload = (e) => {
            const data = e.target?.result?.toString();

            if (data) {

                billDataArray = JSON.parse(data);
                // const rows = data?.slice(data.indexOf("\n") + 1, -1).split("\n");

                billDataArray.forEach((item, index)=> {
                    item.annualInvoiceValue = bill[index].annualInvoiceValue;
                    item.discountOffered = bill[index].discountOffered;
                    item.annualVendorValue = bill[index].annualVendorValue;
                    item.unitRate = bill[index].unitRate;
                });

                // billDataArray = rows.map(row => {
                //     const linkFields = row.replace(/['"]+/g, '').split(",");
                //     return {
                //         id: parseInt(linkFields[0]),
                //         customerName: linkFields[1],
                //         cpNumber: parseInt(linkFields[2]),
                //         capacity: linkFields[3],
                //         linkFrom: linkFields[4],
                //         linkTo: linkFields[5],
                //         doco: linkFields[6],
                //         lastMile: linkFields[7],
                //         annualInvoiceValue: parseFloat(linkFields[8]),
                //         sharePercent: parseFloat(linkFields[9]),
                //         unitRate: parseFloat(linkFields[10]),
                //         numberOfDays: parseInt(linkFields[11]),
                //         downtime: parseFloat(linkFields[12]),
                //         uptimePercent: parseFloat(linkFields[13]),
                //         penaltySlab: parseInt(linkFields[14]),
                //         penaltyHours: parseFloat(linkFields[15]),
                //         amount: parseFloat(linkFields[16]),
                //         downtimes: [],
                //     }
                // });
            }

            res(billDataArray);
        }
    });
    return promise;
}
