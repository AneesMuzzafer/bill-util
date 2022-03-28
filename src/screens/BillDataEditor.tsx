import { Chip, Container, Paper, TextField, Typography, Box, Button } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/hook";
import DateAdapter from '@mui/lab/AdapterDayjs';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';

import { DownTime, roundToTwo, updateOneItem } from "../state/Bill";

const BillDataEditor = () => {

    const params = useParams();

    const index = parseInt(params.id || "0") - 1;

    const billDataItem = useAppSelector(state => state.billItems[index]);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [days, setDays] = React.useState(billDataItem.numberOfDays);
    const [linkDowntimes, setLinkDowntimes] = React.useState<DownTime[]>([...billDataItem.downtimes]);

    const total = roundToTwo((linkDowntimes.reduce((p, c) => p + c.downtime, 0)) / 3600000);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let value = parseInt(e.target.value);
        if (value >= 0) {
            setDays(value);
        } else {
            setDays(0);
        }
    }

    const handleTimeChange = (newValue: Date | null, at: string, index: number) => {
        console.log(newValue, newValue)
        if (at === "s" && newValue) {
            setLinkDowntimes(p => {
                let prev = JSON.parse(JSON.stringify(p));
                prev[index].startedAt = newValue.valueOf();
                prev[index].downtime = prev[index].resolvedAt - prev[index].startedAt;
                return prev;
            });
        } else if (at === "r" && newValue) {
            setLinkDowntimes(p => {
                let prev = JSON.parse(JSON.stringify(p));
                prev[index].resolvedAt = newValue.valueOf();
                prev[index].downtime = prev[index].resolvedAt - prev[index].startedAt;
                return prev;
            });
        }
    }

    const handleAdd = () => {
        setLinkDowntimes(p => [...p, { id: -1, startedAt: new Date().valueOf(), resolvedAt: new Date().valueOf(), downtime: 0 }]);
    }

    const handleDelete = (index: number) => {
        setLinkDowntimes(p => p.filter((_, i) => i !== index));
    }

    const handleSave = () => {
        dispatch(updateOneItem({
            itemIndex: index,
            days: days,
            dt: linkDowntimes
        }));
        navigate("/billData");
    }

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Container sx={{ paddingTop: 5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5" sx={{ color: "darkturquoise", textDecorationLine: "underline", marginBottom: 2 }}>{billDataItem.customerName}</Typography>
                    <Button variant="contained" onClick={handleSave}>SAVE</Button>
                </Box>
                <Paper sx={{ display: "flex", justifyContent: "flex-start", flexDirection: 'column', alignItems: "flex-start", padding: 2, margin: 2 }}>
                    <Typography variant="button">CP No: {billDataItem.cpNumber}</Typography>
                    <Typography variant="button">Link Detail: {billDataItem.linkFrom} - {billDataItem.linkTo}</Typography>
                    <Typography variant="button">Unit Rate: {billDataItem.unitRate}</Typography>
                    <Typography variant="button">Link Type: {billDataItem.lastMile}</Typography>
                    <Typography variant="button">Total: {total} Hours</Typography>
                </Paper>
                <Box>
                    <TextField label="No. of Days" variant="outlined" sx={{ marginY: 5 }} value={days} onChange={(e: any) => handleChange(e)} />
                </Box>
                <Typography variant="overline">Downtimes</Typography>
                {
                    linkDowntimes.map((downtime, index) => (
                        <div key={index}>
                            <Paper
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    p: 1,
                                    my: 2,
                                }}
                                variant="elevation"
                                component="ul">
                                <Box sx={{ width: "70%", display: "flex", alignItems: "center" }}>
                                    <Chip label={index + 1} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2 }} />
                                    <Box sx={{ marginX: 2 }}>
                                        <DesktopDateTimePicker
                                            label="Started At"
                                            value={new Date(downtime.startedAt)}
                                            onChange={(newValue) => handleTimeChange(newValue, "s", index)}
                                            renderInput={(params: any) => <TextField {...params} />}
                                        />
                                    </Box>
                                    <Box sx={{ marginX: 2 }}>
                                        <DesktopDateTimePicker
                                            label="Resolved At"
                                            value={new Date(downtime.resolvedAt)}
                                            onChange={(newValue) => handleTimeChange(newValue, "r", index)}
                                            renderInput={(params: any) => <TextField {...params} />}
                                        />
                                    </Box>
                                    <Chip label={roundToTwo((downtime.downtime / 3600000)) + " hours"} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2 }} />
                                </Box>
                                <Box>
                                    <Button onClick={() => handleDelete(index)} variant="outlined">Delete</Button>
                                </Box>
                            </Paper>
                        </div>
                    ))
                }
                <Button onClick={handleAdd}> + Add downtime</Button>
            </Container>
        </LocalizationProvider >
    );
}

export default BillDataEditor;