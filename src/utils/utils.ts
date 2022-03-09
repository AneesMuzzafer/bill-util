import { LinkData } from "../state/links";
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

                    console.log("row", )

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
                        lm: linkFields[3],
                        connectedLinks: linkFields[4]?.split(";"),
                        alias: linkFields[5]?.split(";")
                    }
                });
            }

            res(linkDataArray);
        }
    });
    return promise;
}