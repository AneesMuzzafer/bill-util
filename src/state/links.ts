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
    updateNetwork: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    //   state.value += 1
    },
    updateOneLink: (state, action) => {
    //   state.value -= 1
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
});

// Action creators are generated for each case reducer function
export const { updateNetwork, updateOneLink } = counterSlice.actions;

export default counterSlice.reducer;