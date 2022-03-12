import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface DownTime {
    id: number;
    startedAt: number;
    resolvedAt: number;
    downtime: number;
}
export interface BillData {
    id: number;
    customerName: string;
    cpNumber: number;
    capacity: string;
    linkFrom: string;
    linkTo: string;
    doco: string;
    lastMile: string;
    annualInvoiceValue: number;
    sharePercent: number;
    unitRate: number;
    numberOfDays: number;
    downtime: number;
    uptimePercent: number;
    penaltySlab: number;
    penaltyHours: number;
    amount: number;
    downtimes: DownTime[];
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
            // if (item) {
            //     state[state.indexOf(item)].connectedBills = action.payload.connectedBills;
            // }
        },
    },
});

export const { updateBillState, updateOneBill } = BillSlice.actions;

export default BillSlice.reducer;