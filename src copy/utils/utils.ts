export interface TicketObject {
    [key: string]: string;
}

export const processCsv = async (csvFile: object): Promise<TicketObject[]> => {
    const promise = new Promise<TicketObject[]>((res, rej) => {
        let ticketArray: TicketObject[] = [];
        const reader = new FileReader();

        reader.readAsText(csvFile as Blob);
        reader.onload = (e) => {
            const data = e.target?.result?.toString();

            if(data) {
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