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

interface AddDT {
    itemIndex: number;
    downtimeItem: DownTime;
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
        addDowntime: (state, action: PayloadAction<AddDT>) => {
            state[action.payload.itemIndex].downtimes = [...state[action.payload.itemIndex].downtimes, action.payload.downtimeItem];
        }
    },
});

export const { updateBillState, updateOneBill, addDowntime } = BillSlice.actions;

export default BillSlice.reducer;