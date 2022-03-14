import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';


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
        clearBillState: (state) => {
            state.forEach(item => item.downtimes = []);
        },
        addDowntime: (state, action: PayloadAction<AddDT>) => {
            state[action.payload.itemIndex].downtimes = [...state[action.payload.itemIndex].downtimes, action.payload.downtimeItem];
            state[action.payload.itemIndex].downtime = calculateDownTime(state[action.payload.itemIndex].downtimes);
            state[action.payload.itemIndex].uptimePercent = calculateUptimePercent(state[action.payload.itemIndex].downtime, state[action.payload.itemIndex].numberOfDays);
            state[action.payload.itemIndex].penaltySlab = getSlab(state[action.payload.itemIndex].uptimePercent, state[action.payload.itemIndex].lastMile);
            state[action.payload.itemIndex].penaltyHours = calculateDowntimePenalty(state[action.payload.itemIndex].penaltySlab, state[action.payload.itemIndex].downtime);
            state[action.payload.itemIndex].amount = calculateAmount(state[action.payload.itemIndex].penaltyHours, state[action.payload.itemIndex].unitRate, state[action.payload.itemIndex].numberOfDays);
        },
        updateDays: (state, action: PayloadAction<{ index: number, days: number }>) => {
            state[action.payload.index].numberOfDays = action.payload.days;
            state[action.payload.index].uptimePercent = calculateUptimePercent(state[action.payload.index].downtime, state[action.payload.index].numberOfDays);
            console.log(state[action.payload.index].uptimePercent, state[action.payload.index].numberOfDays)
            state[action.payload.index].penaltySlab = getSlab(state[action.payload.index].uptimePercent, state[action.payload.index].lastMile);
            state[action.payload.index].penaltyHours = calculateDowntimePenalty(state[action.payload.index].penaltySlab, state[action.payload.index].downtime);
            state[action.payload.index].amount = calculateAmount(state[action.payload.index].penaltyHours, state[action.payload.index].unitRate, state[action.payload.index].numberOfDays);
        },
        calculateAllItems: (state) => {

            state.forEach(billItem => {
                billItem.downtime = calculateDownTime(billItem.downtimes);
                billItem.uptimePercent = calculateUptimePercent(billItem.downtime, billItem.numberOfDays);
                billItem.penaltySlab = getSlab(billItem.uptimePercent, billItem.lastMile);
                billItem.penaltyHours = calculateDowntimePenalty(billItem.penaltySlab, billItem.downtime);
                billItem.amount = calculateAmount(billItem.penaltyHours, billItem.unitRate, billItem.numberOfDays);
            })
        }
    },
});

export const { updateBillState, updateOneBill, addDowntime, calculateAllItems, clearBillState, updateDays } = BillSlice.actions;

export default BillSlice.reducer;

const roundToTwo = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

const calculateDownTime = (downTimeArray: DownTime[]) => {
    let downTime: number;
    if (downTimeArray.length > 0) {
        downTime = downTimeArray.reduce((p, c) => p + c.downtime, 0);
        if (downTime) {
            return downTime;
        } else {
            return 0;
        }
    } else {
        return 0;
    }

}

const calculateUptimePercent = (totalDowntime: number, days: number) => {
    totalDowntime = totalDowntime / 60000;
    return ((days * 24 * 60) - (totalDowntime)) / (days * 24 * 60);
}

const getSlab = (uptimePercent: number, linkType: string) => {

    if (linkType === "UG") {
        if (uptimePercent >= 0.995) {
            return 0;
        } else if (uptimePercent < 0.995 && uptimePercent >= 0.99) {
            return 1;
        } else if (uptimePercent < 0.99 && uptimePercent >= 0.98) {
            return 2;
        } else if (uptimePercent < 0.98 && uptimePercent >= 0.97) {
            return 3;
        } else if (uptimePercent < 0.97 && uptimePercent >= 0.96) {
            return 4;
        } else if (uptimePercent < 0.96 && uptimePercent >= 0.95) {
            return 5;
        } else if (uptimePercent < 0.95 && uptimePercent >= 0.90) {
            return 6;
        } else if (uptimePercent < 0.90) {
            return 7;
        } else {
            return -1;
        }
    } else if (linkType === "OH") {
        if (uptimePercent >= 0.995) {
            return 0;
        } else if (uptimePercent < 0.995 && uptimePercent >= 0.99) {
            return 1;
        } else if (uptimePercent < 0.99 && uptimePercent >= 0.98) {
            return 2;
        } else if (uptimePercent < 0.98 && uptimePercent >= 0.97) {
            return 3;
        } else if (uptimePercent < 0.97 && uptimePercent >= 0.96) {
            return 4;
        } else if (uptimePercent < 0.96 && uptimePercent >= 0.95) {
            return 5;
        } else if (uptimePercent < 0.95 && uptimePercent >= 0.90) {
            return 6;
        } else if (uptimePercent < 0.90) {
            return 7;
        } else {
            return -1;
        }
    } else {
        return -1;

    }
}

const calculateDowntimePenalty = (penaltySlab: number, downtime: number) => {
    switch (penaltySlab) {
        case 0:
            return (downtime / 3600000) * 1;
        case 1:
            return (downtime / 3600000) * 1.25;
        case 2:
            return (downtime / 3600000) * 1.5;
        case 3:
            return (downtime / 3600000) * 1.75;
        case 4:
            return (downtime / 3600000) * 2;
        case 5:
            return (downtime / 3600000) * 2.25;
        case 6:
            return (downtime / 3600000) * 2.5;
        case 7:
            return (downtime / 3600000) * 3;
        default:
            return 0;
    }
}

const calculateAmount = (penalty: number, unitRate: number, days: number) => {
    return ((unitRate / 24) * ((days * 24) - penalty));
}

// export const getTotalDownTime = createSelector((state: RootState) => state.billItems[2].downtimes, (arr) => {
//     if (arr && arr.length > 0) {
//         let totalDowntime = 0;
//         arr.forEach(a => { totalDowntime = totalDowntime + a.downtime })
//         return totalDowntime;
//     } else {
//         return "nope"
//     }
// });