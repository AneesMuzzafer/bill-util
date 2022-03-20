import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ParsedTicket } from "./parsedLinks";
export interface LinkData {
    id: number;
    label: string;
    region: string;
    cps: number[];
    lm: string;
    connectedLinks?: string[];
    alias: string[];
}

const initialState: LinkData[] = [];

export const LinkSlice = createSlice({
    name: 'links',
    initialState,
    reducers: {
        updateNetwork: (state, action: PayloadAction<LinkData[]>) => {
            return action.payload;
        },
        updateOneLink: (state, action: PayloadAction<LinkData>) => {
            let item = state.find(s => s.id === action.payload.id);
            if (item) {
                state[state.indexOf(item)].connectedLinks = action.payload.connectedLinks;
            }
        },
        addAliases: (state, action: PayloadAction<ParsedTicket[]>) => {
            action.payload.forEach(ticket => {
                let aliases = state[ticket.firstMatchRefIndex].alias;
                if (aliases) {
                    aliases.push(ticket.linkname);
                    state[ticket.firstMatchRefIndex].alias = aliases;
                    localStorage.setItem("links", JSON.stringify(state));
                }
            });
        },
    },
});

export const { updateNetwork, updateOneLink, addAliases } = LinkSlice.actions;

export default LinkSlice.reducer;