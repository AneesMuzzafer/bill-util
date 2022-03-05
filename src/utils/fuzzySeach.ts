import { TicketObject } from "./utils";
import { LinkData } from "../state/links";
import Fuse from 'fuse.js'

import { ParsedTicket } from "../state/parsedLinks";

export const doFuzzySearch = (ticketArray: TicketObject[], links: LinkData[]) => {
    let id = 0;
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

                if (match.length > 0 && match[0].score && match[0].score < 0.4) {
                    parsedResult.push({
                        id: id++,
                        linkname: link,
                        completeMatch: true,
                        partialMatch: true,
                        ticketId: ticket.ID,
                        firstMatchRefIndex: match[0].refIndex,
                        matches: match
                    });

                } else if (match.length > 0 && match[0].score && match[0].score > 0.4) {
                    parsedResult.push({
                        id: id++,
                        linkname: link,
                        completeMatch: false,
                        partialMatch: true,
                        ticketId: ticket.ID,
                        firstMatchRefIndex: match[0].refIndex,
                        matches: match
                    });
                } else {
                    parsedResult.push({
                        id: id++,
                        linkname: link,
                        completeMatch: false,
                        partialMatch: false,
                        ticketId: ticket.ID,
                        firstMatchRefIndex: -1,
                        matches: []
                    });
                }
            });

        }

    });

    return parsedResult;
}