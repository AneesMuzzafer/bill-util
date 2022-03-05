import { TicketObject } from "./utils";
import { LinkData } from "../state/links";
// import Fuse from 'fuse.js'


export const doFuzzySearch = (ticketArray: TicketObject[], links: LinkData[]) => {

//     let sortedArray: any[] = [];
//     let unSortedArray: any[] = [];
//     let severelyUnSortedArray: any[] = [];
//     let ticketData: any[] = [];


//     const fuse = new Fuse(links, {
//         keys: [
//             {
//                 name: "label",
//                 weight: 1
//             }, {
//                 name: "region",
//                 weight: 0.01
//             }
//         ],
//         includeScore: true
//     });

//     // console.log(ticketArray);
//     let parsedResult: any[] = [];
//     ticketArray.forEach(ticket => {
//         if (ticket.Title) {
//             const clearedTitle = ticket.Title.replace(/ *\([^)]*\) */g, "");
//             const parsedLinks = clearedTitle.split(/[-;/\\/]+/);
//             console.log(parsedLinks);

            
//             parsedLinks.forEach((link: string, index) => {

//                 const match = fuse.search(link.trim());

//                 // console.log(match);

//                 if (match.length > 0 && match[0].score && match[0].score < 0.2) {
//                     parsedResult.push({
//                         linkname: link,
//                         matched: true,
//                         ticketId: ticket.ID,
//                         firstMatch: match[0].item

//                     })

//                 }


//                 // if (match.length > 0 && match[0].score && match[0].score < 0.3) {
//                 //     parsedResult.push({
//                 //         link,
//                 //         matched: true,
//                 //         matchedLink: match[0].item.label,
//                 //         matchedIndex: match[0].refIndex
//                 //         // otherlink: parsedLinks[(index + 1) % 2],
//                 //     });

//                 // }

//                 // if (match.length > 0 && match[0].score && match[0].score > 0.3) {

//                 //     parsedResult.forEach(l => {
//                 //         if( l.matched === true) {
//                 //             const fuse2 = new Fuse(links[l.matchedIndex].connectedLinks!, {
//                 //                 keys: [{
//                 //                     name: "label",
//                 //                     weight: 1 
//                 //                 }]
//                 //             });


//                 //         }
//                 //     })


//                 // }







//                 // ticketResult.push({ link, match: match[0].item.label, score: match[0].score });




//                 //     if (match.length > 0) {
//                 //         if (match[0].score! < 0.3) {
//                 //             ticketData.push({
//                 //                 link,
//                 //                 matched: true,
//                 //                 matchedLink: match[0].item.label,
//                 //                 otherlink: parsedLinks[(index + 1) % 2],
//                 //             })
//                 //             // sortedArray.push({
//                 //             //     link,
//                 //             //     matched: match[0].item.label,
//                 //             //     score: match[0].score
//                 //             // });
//                 //         } else {

//                 //             // ticketData.push({
//                 //             //     link,
//                 //             //     matched: false,
//                 //             //     matchedLink: "",
//                 //             //     otherlink: parsedLinks[(index + 1) % 2],
//                 //             // })
//                 //             // unSortedArray.push({
//                 //             //     link,
//                 //             //     otherLink: parsedLinks[(index + 1) % 2],
//                 //             //     // ij: [match[0].item.label, match[1]?.item.label]
//                 //             // });
//                 //         }

//                 //     } else {
//                 //         ticketData.push({
//                 //             link,
//                 //             matched: false,
//                 //             matchedLink: "",
//                 //             otherlink: parsedLinks[(index + 1) % 2],
//                 //         })
//                 //         // severelyUnSortedArray.push({
//                 //         //     link,
//                 //         //     otherLink: parsedLinks[(index + 1) % 2]
//                 //         // });
//                 //     }
//             });


//             // ticketResult && ticketResult.forEach((t: any) => {
//             //     if (t.score > 0.3) {
//             //         ticketResult.forEach(l => {

//             //         })
//             //     }
//             // })


//             // console.log(parsedLinks);    
//         } else {

//             // console.log(ticket)
//         }

//     });

//     console.log(parsedResult);
//     // console.log(unSortedArray);
//     // console.log(severelyUnSortedArray);

//     // const sortedLinks = ticketData.filter(t => t.matched === true).map(m => m.link);

//     // console.log(sortedLinks);

//     // ticketData.forEach(ticket => {
//     //     if (!ticket.matched) {
//     //         ticketData.forEach(secondTicket => {

//     //         })
//     //     }

//         //  && ticketData.find(t => t.link === ticket.otherLink).matched ) {

//     })

}