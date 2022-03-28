import React from "react";
import { useAppDispatch, useAppSelector } from "../state/hook";

import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid';

import { addDowntime, calculateAllItems, DownTime, clearBillState, BillData, updateDays, roundToTwo, updateBillDays } from "../state/Bill";
import { Button, Chip, Container, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createBillSummaryString, createDowmtimeString, getSlab } from "../utils/downTimeCSV";

import { CSVLink } from "react-csv";
import StepperComponent from "../components/StepperComponent";
import { Box } from "@mui/system";
import download from "downloadjs";

// id: number;
// customerName: string;
// cpNumber: number;
// capacity: string;
// linkFrom: string;
// linkTo: string;
// doco: string;
// lastMile: string;
// annualInvoiceValue: number;
// sharePercent: number;
// unitRate: number;
// numberOfDays: number;
// downtime: number;
// uptimePercent: number;
// penaltySlab: number;
// penaltyHours: number;
// amount: number;
// downtimes: DownTime[];


// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxi', firstName: 'Harvey', age: 65 },
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxi', firstName: 'Harvey', age: 65 },
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxi', firstName: 'Harvey', age: 65 },
// ];


const BillDataScreen = () => {

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 60
        },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            width: 180,
            editable: true,
        },
        {
            field: 'cpNumber',
            headerName: 'CP No.',
            width: 80,
            editable: true,
        },
        {
            field: 'lastMile',
            headerName: 'Link Type',
            type: 'number',
            width: 80,
            editable: true,
        },
        {
            field: 'annualInvoiceValue',
            headerName: 'Annual Value',
            type: 'number',
            width: 120,
            editable: true,
        },
        {
            field: 'sharePercent',
            headerName: 'Share',
            type: 'number',
            width: 110,
            editable: true,
            // valueGetter: (params: GridValueGetterParams) => `${params.row.sharePercent * 100} % `,
            valueFormatter: (params: GridValueFormatterParams) => {
                const valueFormatted = Number(
                    (params.value as number) * 100,
                ).toLocaleString();
                return `${valueFormatted} %`;
            },
        },
        {
            field: 'unitRate',
            headerName: 'Unit Rate',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'numberOfDays',
            headerName: 'Days',
            type: 'number',
            width: 80,
            editable: true,
        },
        {
            field: 'downtime',
            headerName: 'Downtime',
            type: 'number',
            width: 140,
            editable: true,
            valueGetter: (params: GridValueGetterParams) => roundToTwo(params.row.downtime / 3600000)
        },
        {
            field: 'uptimePercent',
            headerName: 'Uptime Percent',
            type: 'number',
            width: 140,
            editable: true,
            // valueGetter: (params: GridValueGetterParams) => `${params.row.uptimePercent * 100} % `,
            valueFormatter: (params: GridValueFormatterParams) => {
                const valueFormatted = Number(
                    (params.value as number) * 100,
                ).toLocaleString();
                return `${valueFormatted} %`;
            },
        },
        {
            field: 'penaltySlab',
            headerName: 'Penalty Slab',
            type: 'number',
            width: 110,
            editable: true,
            valueGetter: (params: GridValueGetterParams) => getSlab(params.row.penaltySlab)
        },
        {
            field: 'penaltyHours',
            headerName: 'Penalty',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            type: 'number',
            width: 140,
            editable: true,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 140,
            disableColumnMenu: true,
            // align: 'right',
            renderCell: (params: GridRenderCellParams<Date>) => (
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(params.row)}
                    style={{ marginLeft: 16 }}>
                    expand
                </Button>
            ),
        },
        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (params: GridValueGetterParams) =>
        //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        // },
    ];


    // const parsedTickets = useAppSelector(state => state.parsedTickets);
    // const networkArray = useAppSelector(state => state.links);
    const billData = useAppSelector(state => state.billItems);

    const [totalDays, setTotalDays] = React.useState<number>(billData[0].numberOfDays);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // console.log(parsedTickets);
    console.log(billData);

    React.useEffect(() => {
        // dispatch(clearBillState());
        // parsedTickets.forEach((ticket) => {
        //     if (networkArray[ticket.firstMatchRefIndex].lm !== "sanguine" || !ticket.trafficAffected) return;

        //     networkArray[ticket.firstMatchRefIndex].cps.forEach(cp => {

        //         const item = billData.find(bi => bi.cpNumber === cp);
        //         if (item) {
        //             const itemIndex = billData.indexOf(item);

        //             // console.log(networkArray[itemIndex].label, ticket.linkname)

        //             dispatch(addDowntime({
        //                 itemIndex,
        //                 downtimeItem: {
        //                     id: ticket.id,
        //                     startedAt: ticket.ticketStartedAt,
        //                     resolvedAt: ticket.ticketResolvedAt,
        //                     downtime: ticket.ticketResolvedAt - ticket.ticketStartedAt,
        //                 }
        //             }));



        //         }
        //     });

        // });




        dispatch(calculateAllItems());
    }, []);

    const update = () => {
        dispatch(calculateAllItems());
    }

    const totalValue = roundToTwo(billData.reduce((p, c) => p + c.amount, 0));

    const handleEdit = (row: BillData) => {
        navigate(`/itemEditor/${row.id}`);
    }

    const getCSV = () => {
        const dat = createDowmtimeString(billData);
    }

    const downloadJSON = () => {
        download(JSON.stringify(billData), "bill.json", "text/JSON");
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let value = parseInt(e.target.value);
        if (value >= 0) {
            setTotalDays(value);
        } else {
            setTotalDays(0);
        }
    }

    return (
        <>
            <Container>
                <StepperComponent step={3} />
                <Paper sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 1, marginBottom: 2 }}>
                    <Box display="flex" >
                        <Typography variant="button">Total Amount:  <Chip label={`₹ ${roundToTwo(totalValue).toLocaleString("en-IN")}`} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginX: 2, marginBottom: 1 }} /></Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <CSVLink filename={`downtime-${new Date()}.csv`} style={{ textDecorationLine: "none", marginRight: 20 }} data={createDowmtimeString(billData)}>
                            <Button variant="outlined" >Downtime</Button>
                        </CSVLink>
                        <CSVLink filename={`bill-summary-${new Date()}.csv`} style={{ textDecorationLine: "none", marginRight: 20 }} data={createBillSummaryString(billData, totalValue)}>
                            <Button variant="outlined" >Bill Summary</Button>
                        </CSVLink>
                        <Button onClick={() => downloadJSON()} variant="outlined">JSON</Button>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                        <TextField label="No. of Days" variant="outlined" value={totalDays} sx={{mx: 2}} onChange={(e: any) => handleChange(e)} />
                        <Button onClick={() => dispatch(updateBillDays(totalDays))} variant="text">Update</Button>
                    </Box>
                </Paper>
            </Container>
            {/* <h1>{totalValue}</h1>
            <Button onClick={update}>refresh</Button>
            <Button onClick={getCSV}>getCSV</Button>
            <CSVLink style={{ textDecorationLine: "none" }} data={createDowmtimeString(billData)}>
                <Button variant="outlined">Downtime</Button>
            </CSVLink> */}
            <div style={{ marginTop: 5, display: "flex", justifyContent: "center" }} >
                <div style={{ height: "70vh", width: '95%', display: "flex", justifyContent: "center" }}>
                    {/* <div style={{ display: 'flex', height: '100%' }}> */}
                    {/* <div style={{ flexGrow: 1 }}> */}
                    <DataGrid
                        // components={{ Toolbar: GridToolbar }}
                        rows={billData}
                        columns={columns}
                        pageSize={56}
                        rowsPerPageOptions={[56]}
                        // checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </div>

        </>
    );
};

export default BillDataScreen;