import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface BillData {
    id: number;
    label: string;
    region?: string;
    lm?: string;
    connectedBills?: string[];
    alias?: string[];
}

const initialState: BillData[] = [];

export const BillSlice = createSlice({
    name: 'bills',
    initialState,
    reducers: {
        updateBillState: (state, action: PayloadAction<BillData[]>) => {
            return action.payload;
        },
        updateOneBill: (state, action: PayloadAction<BillData>) => {
            let item = state.find(s => s.id === action.payload.id);
            if (item) {
                state[state.indexOf(item)].connectedBills = action.payload.connectedBills;
            }
        },
    },
});

export const { updateBillState, updateOneBill } = BillSlice.actions;

export default BillSlice.reducer;