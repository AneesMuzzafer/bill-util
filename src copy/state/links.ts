import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LinkData {
  id: number;
  label: string;
  region?: string;
  connectedLinks?: number[];
  alias?: string[];
}

const initialState: LinkData[] = [];

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateNetwork: (state, action: PayloadAction<LinkData[]>) => {
        return action.payload;
    },
    updateOneLink: (state, action: PayloadAction<LinkData>) => {
        let item = state.find(s => s.id === action.payload.id);
        if(item) {
            // console.log("inside state", action.payload, action.payload.connectedLinks)
            state[state.indexOf(item)].connectedLinks = action.payload.connectedLinks;
            
            // item = action.payload;
        }
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
});

// Action creators are generated for each case reducer function
export const { updateNetwork, updateOneLink } = counterSlice.actions;

export default counterSlice.reducer;