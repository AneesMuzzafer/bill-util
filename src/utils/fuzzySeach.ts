import { TicketObject } from "./utils";
import { LinkData } from "../state/links";
import Fuse from 'fuse.js'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ParsedTicket } from "../state/parsedLinks";

dayjs.extend(customParseFormat)


export const doFuzzySearch = (ticketArray: TicketObject[], links: LinkData[]) => {
    let id = 0;
    const fuse = new Fuse(links, {
        keys: ['label', 'alias'],
        // [
        //     {
        //         name: "label",
        //         weight: 1
        //     }, {
        //         name: "region",
        //         weight: 0.01
        //     }
        // ],
        includeScore: true
    });

    let parsedResult: ParsedTicket[] = [];
    ticketArray.forEach(ticket => {
        if (ticket.Title) {
            const clearedTitle = ticket.Title.replace(/ *\([^)]*\) */g, "");
            const parsedLinks = clearedTitle.split(/[-;/\\/]+/);

            const openingDate = dayjs(ticket["Opening date"], "DD-MM-YYYY hh:mm").valueOf();
            const closingDate = dayjs(ticket["Resolution date"], "DD-MM-YYYY hh:mm").valueOf();

            parsedLinks.forEach((link: string, index) => {

                const match = fuse.search(link.trim());
                if (match.length > 0 && match[0].score && match[0].score < 0.3) {
                    parsedResult.push({
                        id: id++,
                        linkname: link,
                        ticketDesc: ticket.Title,
                        completeMatch: true,
                        partialMatch: true,
                        ticketId: ticket.ID,
                        firstMatchRefIndex: match[0].refIndex,
                        ticketStartedAt: openingDate,
                        ticketResolvedAt: closingDate,
                        trafficAffected: false,
                        trafficAffectingStatusInTicket: !ticket.Description.toUpperCase().includes("{NO}") ,
                        matches: parsedLinks.filter(l => l !== link)
                    });

                } else if (match.length > 0 && match[0].score && match[0].score > 0.3) {
                    parsedResult.push({
                        id: id++,
                        linkname: link,
                        ticketDesc: ticket.Title,
                        completeMatch: false,
                        partialMatch: true,
                        ticketId: ticket.ID,
                        firstMatchRefIndex: match[0].refIndex,
                        ticketStartedAt: openingDate,
                        ticketResolvedAt: closingDate,
                        trafficAffected: false,
                        trafficAffectingStatusInTicket: !ticket.Description.toUpperCase().includes("{NO}") ,
                        matches: parsedLinks.filter(l => l !== link)
                    });
                } else {
                    parsedResult.push({
                        id: id++,
                        linkname: link,
                        ticketDesc: ticket.Title,
                        completeMatch: false,
                        partialMatch: false,
                        ticketId: ticket.ID,
                        firstMatchRefIndex: -1,
                        ticketStartedAt: openingDate,
                        ticketResolvedAt: closingDate,
                        trafficAffected: false,
                        trafficAffectingStatusInTicket: !ticket.Description.toUpperCase().includes("{NO}") ,
                        matches: parsedLinks.filter(l => l !== link)
                    });
                }
            });

        }

    });

    return parsedResult;
}

export const doFuseAgain = (connectedLinks: string[], link: string) => {
    const fuse = new Fuse(connectedLinks, {
        
        // [
        //     {
        //         name: "label",
        //         weight: 1
        //     }, {
        //         name: "region",
        //         weight: 0.01
        //     }
        // ],
        includeScore: true
    });

    const match = fuse.search(link.trim());
    console.log(connectedLinks, "-----", match)
    return 2;
}