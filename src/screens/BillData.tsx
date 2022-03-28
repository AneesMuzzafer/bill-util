import React from "react";
import { useAppDispatch, useAppSelector } from "../state/hook";

import { DataGrid, GridColDef, GridRenderCellParams, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid';

import {  calculateAllItems, BillData, roundToTwo, updateBillDays } from "../state/Bill";
import { Button, Chip, Container, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createBillSummaryString, createDowmtimeString, getSlab } from "../utils/downTimeCSV";

import { CSVLink } from "react-csv";
import StepperComponent from "../components/StepperComponent";
import { Box } from "@mui/system";
import download from "downloadjs";

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
    ];

    const billData = useAppSelector(state => state.billItems);

    const [totalDays, setTotalDays] = React.useState<number>(billData[0].numberOfDays);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  
    React.useEffect(() => {
        dispatch(calculateAllItems());
    }, [dispatch]);

    const totalValue = roundToTwo(billData.reduce((p, c) => p + c.amount, 0));

    const handleEdit = (row: BillData) => navigate(`/itemEditor/${row.id}`);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => (parseInt(e.target.value) >= 0 ? setTotalDays(parseInt(e.target.value)) : setTotalDays(0));

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
                        <Button onClick={() => download(JSON.stringify(billData), "bill.json", "text/JSON")} variant="outlined">JSON</Button>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                        <TextField label="No. of Days" variant="outlined" value={totalDays} sx={{mx: 2}} onChange={(e: any) => handleChange(e)} />
                        <Button onClick={() => dispatch(updateBillDays(totalDays))} variant="text">Update</Button>
                    </Box>
                </Paper>
            </Container>
            <div style={{ marginTop: 5, display: "flex", justifyContent: "center" }} >
                <div style={{ height: "70vh", width: '95%', display: "flex", justifyContent: "center" }}>
                    <DataGrid
                        rows={billData}
                        columns={columns}
                        pageSize={56}
                        rowsPerPageOptions={[56]}
                        disableSelectionOnClick
                    />
                </div>
            </div>
        </>
    );
};

export default BillDataScreen;