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
    discountOffered: number;
    annualVendorValue: number;
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
        updateOneItem: (state, action: PayloadAction<{ itemIndex: number, days: number, dt: DownTime[] }>) => {
            console.log(action.payload.dt);

            state[action.payload.itemIndex].downtimes = action.payload.dt;
            state[action.payload.itemIndex].numberOfDays = action.payload.days;
            state[action.payload.itemIndex].downtime = calculateDownTime(state[action.payload.itemIndex].downtimes);
            if (action.payload.days > 0) {
                state[action.payload.itemIndex].uptimePercent = calculateUptimePercent(state[action.payload.itemIndex].downtime, state[action.payload.itemIndex].numberOfDays);
                state[action.payload.itemIndex].penaltySlab = getSlab(state[action.payload.itemIndex].uptimePercent, state[action.payload.itemIndex].lastMile);
                state[action.payload.itemIndex].penaltyHours = calculateDowntimePenalty(state[action.payload.itemIndex].penaltySlab, state[action.payload.itemIndex].downtime);
                state[action.payload.itemIndex].amount = calculateAmount(state[action.payload.itemIndex].penaltyHours, state[action.payload.itemIndex].unitRate, state[action.payload.itemIndex].numberOfDays);
            } else {
                state[action.payload.itemIndex].uptimePercent = 1;
                state[action.payload.itemIndex].penaltySlab = 0;
                state[action.payload.itemIndex].penaltyHours = 0;
                state[action.payload.itemIndex].amount = 0;
            }
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
            if (action.payload.days === 0) {
                state[action.payload.index].uptimePercent = 1;
                state[action.payload.index].penaltySlab = 0;
                state[action.payload.index].penaltyHours = 0;
                state[action.payload.index].amount = 0;
            } else {
                state[action.payload.index].uptimePercent = calculateUptimePercent(state[action.payload.index].downtime, state[action.payload.index].numberOfDays);
                state[action.payload.index].penaltySlab = getSlab(state[action.payload.index].uptimePercent, state[action.payload.index].lastMile);
                state[action.payload.index].penaltyHours = calculateDowntimePenalty(state[action.payload.index].penaltySlab, state[action.payload.index].downtime);
                state[action.payload.index].amount = calculateAmount(state[action.payload.index].penaltyHours, state[action.payload.index].unitRate, state[action.payload.index].numberOfDays);
            }
        },
        updateBillDays: (state, action: PayloadAction<number>) => {
            state.forEach(billItem => {
                billItem.numberOfDays = action.payload;
                billItem.uptimePercent = calculateUptimePercent(billItem.downtime, billItem.numberOfDays);
                billItem.penaltySlab = getSlab(billItem.uptimePercent, billItem.lastMile);
                billItem.penaltyHours = calculateDowntimePenalty(billItem.penaltySlab, billItem.downtime);
                billItem.amount = calculateAmount(billItem.penaltyHours, billItem.unitRate, billItem.numberOfDays);
            })
        },
        calculateAllItems: (state) => {
            state.forEach(billItem => {

                if (billItem.numberOfDays === 0) {
                    billItem.downtime = calculateDownTime(billItem.downtimes);
                    billItem.uptimePercent = 1
                    billItem.penaltySlab = 0
                    billItem.penaltyHours = 0
                    billItem.amount = 0
                } else {
                    billItem.downtime = calculateDownTime(billItem.downtimes);
                    billItem.uptimePercent = calculateUptimePercent(billItem.downtime, billItem.numberOfDays);
                    billItem.penaltySlab = getSlab(billItem.uptimePercent, billItem.lastMile);
                    billItem.penaltyHours = calculateDowntimePenalty(billItem.penaltySlab, billItem.downtime);
                    billItem.amount = calculateAmount(billItem.penaltyHours, billItem.unitRate, billItem.numberOfDays);
                }
            })
        }
    },
});

export const { updateBillState, updateOneItem, addDowntime, calculateAllItems, clearBillState, updateDays, updateBillDays } = BillSlice.actions;

export default BillSlice.reducer;

export const roundToTwo = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;
export const roundToFour = (num: number) => Math.round((num + Number.EPSILON) * 10000) / 10000;

const calculateDownTime = (downTimeArray: DownTime[]) => {
    let downTime: number;
    if (downTimeArray.length > 0) {
        if (downTimeArray.length === 1 && downTimeArray[0].downtime < 3600000) {
            return 0;
        }
        if (downTimeArray.length === 2 && (downTimeArray[0].downtime + downTimeArray[1].downtime) < 7200000) {
            return 0;
        }
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

const calculateUptimePercent = (totalDowntime: number, days: number) => roundToFour(((days * 24 * 60) - (totalDowntime / 60000)) / (days * 24 * 60));

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
            return roundToTwo((downtime / 3600000) * 1);
        case 1:
            return roundToTwo((downtime / 3600000) * 1.25);
        case 2:
            return roundToTwo((downtime / 3600000) * 1.5);
        case 3:
            return roundToTwo((downtime / 3600000) * 1.75);
        case 4:
            return roundToTwo((downtime / 3600000) * 2);
        case 5:
            return roundToTwo((downtime / 3600000) * 2.25);
        case 6:
            return roundToTwo((downtime / 3600000) * 2.5);
        case 7:
            return roundToTwo((downtime / 3600000) * 3);
        default:
            return 0;
    }
}

const calculateAmount = (penalty: number, unitRate: number, days: number) => roundToTwo((unitRate / 24) * ((days * 24) - penalty));
