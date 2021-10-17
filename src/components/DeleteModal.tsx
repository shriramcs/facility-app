import { Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import FacilityServiceApi from "../services/facility.service";
import { FacilityI } from "../types/Facility.type";
import ModalDialog from "./ModalDialog/ModalDialog";

interface Props {
    facility: FacilityI;
    refreshList: () => void
}

const DeleteModal: React.FC<Props> = props => {
    const {facility, refreshList} = props;
    const [openDeleteModal, setOpenDeleteModal] = useState(true);

    const handleClose = () => {
        setOpenDeleteModal(false);
    };
    const handleDelete = () => {
        console.log(facility);

        FacilityServiceApi.deleteItem(facility).then(d => {
            console.log("delete successfully", d);
            handleClose();
            refreshList();
        })
        
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
                <Typography gutterBottom>
                    Are you sure you want to delete this facility ? <br />
                    You won't be able to recover this data.
                </Typography>
            </Paper>
        </ModalDialog>
    );
}

export default DeleteModal;