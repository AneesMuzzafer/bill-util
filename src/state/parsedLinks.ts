import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ParsedTicket{
    id: number;
    linkname: string;
    ticketDesc: string;
    completeMatch: boolean;
    partialMatch: boolean;
    ticketId: string;
    firstMatchRefIndex: number;
    matches: any[];
}


const initialState: ParsedTicket[] = [];

export const parsedLinkSlice = createSlice({
    name: 'parsedLink',
    initialState,
    reducers: {
        updateParsedState: (state, action: PayloadAction<ParsedTicket[]>) => {
            return action.payload;
        },
        updateOneTicket: (state, action: PayloadAction<ParsedTicket>) => {
            let item = state.find(s => s.id === action.payload.id);
            if (item) {
                state[state.indexOf(item)] = action.payload;
            }
        },
        // getAllMatched: (state) => {
        //     return state 
        // },
        // getAllPartialMatched: () => {

        // },
        // getAllUnmatched: () => {

        // },
        // areAllMatched: () => {

        // }
    },
});

export const { updateParsedState, updateOneTicket } = parsedLinkSlice.actions;

export default parsedLinkSlice.reducer;