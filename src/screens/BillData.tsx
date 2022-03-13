import React from "react";
import { useAppDispatch, useAppSelector } from "../state/hook";

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { addDowntime, DownTime } from "../state/Bill";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxi', firstName: 'Harvey', age: 65 },
];


const BillData = () => {

    const parsedTickets = useAppSelector(state => state.parsedTickets);
    const networkArray = useAppSelector(state => state.links);
    const billData = useAppSelector(state => state.billItems);

    const dispatch = useAppDispatch();
    // console.log(parsedTickets);
    console.log(billData);
    
    React.useEffect(() => {
        parsedTickets.forEach((ticket) => {
            if (networkArray[ticket.firstMatchRefIndex].lm !== "sanguine" || !ticket.trafficAffected) return;

            networkArray[ticket.firstMatchRefIndex].cps.forEach(cp => {

                const item = billData.find(bi => bi.cpNumber === cp);
                if (item) {
                    const itemIndex = billData.indexOf(item);

                    // console.log(networkArray[itemIndex].label, ticket.linkname)

                    dispatch(addDowntime({
                        itemIndex,
                        downtimeItem: {
                            id: ticket.id,
                            startedAt: ticket.ticketStartedAt,
                            resolvedAt: ticket.ticketResolvedAt,
                            downtime: ticket.ticketResolvedAt - ticket.ticketStartedAt,
                        }
                    }));
                }
            });

        });
    }, []);


    // console.log("inBillData", parsedTickets);

    return (
        <>
            <h1>Bismillah</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </>
    );
};

export default BillData;