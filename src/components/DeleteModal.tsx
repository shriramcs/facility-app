import { LinearProgress, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { EMPTY_STRING } from "../common/constants";
import FacilityServiceApi from "../services/facility.service";
import ModalDialog from "./ModalDialog/ModalDialog";

interface Props {
    facilityId: string;
    refreshList: (page: number) => void
}

const DeleteModal: React.FC<Props> = props => {
    const {facilityId, refreshList} = props;
    const [openDeleteModal, setOpenDeleteModal] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(EMPTY_STRING);

    const handleClose = () => {
        setOpenDeleteModal(false);
    };
    const handleDelete = async () => {
        setLoading(true);
        try{
            await FacilityServiceApi.deleteItem(facilityId)
        } catch(e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
        handleClose();
        refreshList(1);
    };
  
    return (
        <ModalDialog
            open={openDeleteModal}
            onClose={handleClose}
            id="deleteNewModal"
            title="Delete Information"
            maxWidth="xs"
            primaryButtonName="Delete"
            primaryButtonColor="error"
            onOk={handleDelete}
        >
            <Paper sx={{p: 2}} elevation={0}>
                { loading && <LinearProgress sx={{mb: 2}}></LinearProgress> }
                { error && 
                    <Typography gutterBottom>
                        {error}
                    </Typography>
                }
            
                <Typography gutterBottom>
                    Are you sure you want to delete this facility ? <br />
                    You won't be able to recover this data.
                </Typography>
            </Paper>
        </ModalDialog>
    );
}

export default DeleteModal;