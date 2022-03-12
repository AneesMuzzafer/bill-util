import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LinkData {
    id: number;
    label: string;
    region?: string;
    cps: number[];
    lm?: string;
    connectedLinks?: string[];
    alias?: string[];
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
    },
});

export const { updateNetwork, updateOneLink } = LinkSlice.actions;

export default LinkSlice.reducer;