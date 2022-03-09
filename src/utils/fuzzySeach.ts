import { TicketObject } from "./utils";
import { LinkData } from "../state/links";
import Fuse from 'fuse.js'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ParsedTicket } from "../state/parsedLinks";

dayjs.extend(customParseFormat)


export const doFuzzySearch = (ticketArray: TicketObject[], links: LinkData[]) => {
    let id = 0;
    console.log(ticketArray, ticketArray[0]["Opening date"])

    const fuse = new Fuse(links, {
        keys: [
            {
                name: "label",
                weight: 1
            }, {
                name: "region",
                weight: 0.01
            }
        ],
        includeScore: true
    });

    let parsedResult: ParsedTicket[] = [];
    ticketArray.forEach(ticket => {
        if (ticket.Title) {
            const clearedTitle = ticket.Title.replace(/ *\([^)]*\) */g, "");
            const parsedLinks = clearedTitle.split(/[-;/\\/]+/);

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
                        ticketStartedAt: dayjs(ticket["Opening date"], "DD-MM-YYYY hh:mm").toDate(),
                        ticketResolvedAt: dayjs(ticket["Resolution date"], "DD-MM-YYYY hh:mm").toDate(),
                        trafficAffected: false,
                        trafficAffectingStatusInTicket: false,
                        matches: match
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
                        ticketStartedAt: dayjs(ticket["Opening date"], "DD-MM-YYYY hh:mm").toDate(),
                        ticketResolvedAt: dayjs(ticket["Resolution date"], "DD-MM-YYYY hh:mm").toDate(),
                        trafficAffected: false,
                        trafficAffectingStatusInTicket: false,
                        matches: match
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
                        ticketStartedAt: dayjs(ticket["Opening date"], "DD-MM-YYYY hh:mm").toDate(),
                        ticketResolvedAt: dayjs(ticket["Resolution date"], "DD-MM-YYYY hh:mm").toDate(),
                        trafficAffected: false,
                        trafficAffectingStatusInTicket: false,
                        matches: []
                    });
                }
            });

        }

    });

    console.log(parsedResult);

    return parsedResult;
}