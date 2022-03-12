import { processBillCsv } from "../utils/utils";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import UploadFileButton from "../components/UploadFileButton";
import { updateBillState } from "../state/Bill";
import { useAppDispatch, useAppSelector } from "../state/hook";

const BillEditor = () => {

    const billItems = useAppSelector(state => state.billItems);
    const dispatch = useAppDispatch();

    const handleBillProcessing = async (billFile: File) => {
        const billData = await processBillCsv(billFile);
        dispatch(updateBillState(billData));
        localStorage.setItem("bill", JSON.stringify(billData));

        console.log("stored", billData)
    }

    return (
        <Container maxWidth={false} >
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <Box sx={{ width: "100%", height: "15vh", borderBottom: "solid 1px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <UploadFileButton handleProcessing={handleBillProcessing} />
                </Box>
                <h1>Bills</h1>
                <Box sx={{ width: "100%" }}>
                    {
                        billItems && billItems.map((item) => 
                              <div key={item.id} style={{ border: "solid 1px red" }}>
                                  {item.customerName} {item.cpNumber} {item.unitRate} {item.amount}
                                {/* {Object.keys(item).map(i => {
                                return <p key={i}>{item} </p> 
                            })} */}
                            </div>
                            // return <LinkRow key={item.id} conLinks={link.connectedLinks} thisLink={link} />
                        )
                    }
                </Box>
            </Box>
        </Container >
    );

}

export default BillEditor;