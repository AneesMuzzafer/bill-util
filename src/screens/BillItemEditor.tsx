import { processBillCsv } from "../utils/utils";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import UploadFileButton from "../components/UploadFileButton";
import { updateBillState } from "../state/Bill";
import { useAppDispatch, useAppSelector } from "../state/hook";
import { Chip, Paper } from "@mui/material";

const BillEditor = () => {

    const billItems = useAppSelector(state => state.billItems);
    const dispatch = useAppDispatch();

    const handleBillProcessing = async (billFile: File) => {
        const billData = await processBillCsv(billFile);
        dispatch(updateBillState(billData));
        localStorage.setItem("bill", JSON.stringify(billData));
    }

    return (
        <Container maxWidth={false} >
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <Box sx={{ width: "100%", height: "15vh", borderBottom: "solid 1px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <UploadFileButton handleProcessing={handleBillProcessing} />
                </Box>
                <Paper variant="outlined" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1, my: 2, }}>
                    <Chip label="ID" color="primary" variant="filled" sx={{ fontWeight: "bold", marginRight: 2, width: 50 }} />
                    <Chip label="Customer Name" color="primary" variant="filled" sx={{ fontWeight: "bold", marginRight: 2, width: 200 }} />
                    <Chip label="Cp Number" color="primary" variant="filled" sx={{ fontWeight: "bold", marginRight: 2, width: 100 }} />
                    <Chip label="Link From" color="primary" variant="filled" sx={{ fontWeight: "bold", marginRight: 2, width: 150 }} />
                    <Chip label="Link To" color="primary" variant="filled" sx={{ fontWeight: "bold", marginRight: 2, width: 150 }} />
                    <Chip label="Annual Invoice Value" color="primary" variant="filled" sx={{ fontWeight: "bold", marginRight: 2, width: 100 }} />
                    <Chip label="Last Mile Vendor" color="primary" variant="filled" sx={{ fontWeight: "bold", marginRight: 2, width: 100 }} />
                    <Chip label="Unit Rate" color="primary" variant="filled" sx={{ fontWeight: "bold", marginRight: 2, width: 100 }} />
                </Paper>
                <Box sx={{ width: "100%" }}>
                    {
                        billItems && billItems.map((item) =>
                            <Paper key={item.id} variant="elevation" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1, my: 2, }}>
                                <Chip label={item.id} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2, width: 50 }} />
                                <Chip label={item.customerName} color="primary" variant="filled" sx={{ fontWeight: "bold", marginRight: 2, width: 200 }} />
                                <Chip label={item.cpNumber} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2, width: 100 }} />
                                <Chip label={item.linkFrom} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2, width: 150 }} />
                                <Chip label={item.linkTo} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2, width: 150 }} />
                                <Chip label={item.annualInvoiceValue?.toLocaleString("en-IN")} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2, width: 100 }} />
                                <Chip label={item.lastMile} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2, width: 100 }} />
                                <Chip label={item.unitRate} color="primary" variant="outlined" sx={{ fontWeight: "bold", marginRight: 2, width: 100 }} />
                            </Paper>
                        )
                    }
                </Box>
            </Box>
        </Container >
    );

}

export default BillEditor;