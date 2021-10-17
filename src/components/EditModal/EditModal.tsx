import { LinearProgress, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { FacilityI } from "../../types/Facility.type";
import FacilityServiceApi from "../../services/facility.service";
import ModalDialog from "../ModalDialog/ModalDialog";

interface Props {
    facility: FacilityI;
    refreshList: () => void
}

export enum modeEnum{
    'new',
    'edit'
};

const EditModal: React.FC<Props> = props => {
    const {refreshList} = props;
    let { id }: any = useParams();
    const history = useHistory();
    const [openEditModal, setOpenEditModal] = useState(false);
    const [mode, setMode] = React.useState<modeEnum>(modeEnum.new);
    const [facilityEditModal, setFacilityEditModal] = React.useState<FacilityI>({} as FacilityI);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    React.useEffect(() => {
        setOpenEditModal(!!id);
        try{
            setMode(id === 'new' ? modeEnum.new : modeEnum.edit);
            if(id !== 'new'){
                const facId = parseInt(id);
                if(!isNaN(facId)){
                    fetchFacilityDetails(parseInt(id));
                }
            }
        } catch(e) {
            console.log(e);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const modalTitle = () => mode === modeEnum.edit ? "Edit Information" : "New Information";
    const handleClose = () => {
        setOpenEditModal(false);
        history.goBack();
    };
    const handleSaveChanges = () => {
        console.log(facilityEditModal);
        
        //validate before submitting the form and close modal.
        if(facilityEditModal){
            if(!(facilityEditModal.name && facilityEditModal.type && facilityEditModal.address)){
                return;
            }
        }

        setLoading(true);
        (
            mode === modeEnum.new ?
            FacilityServiceApi.addItem(facilityEditModal) : 
            FacilityServiceApi.putItem(facilityEditModal)
        ).then(d => {
            setLoading(false);
            history.goBack();
            handleClose();
            refreshList();
        }).catch(e => {
            setLoading(false);
            console.log(e);
        })
    };
    
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof FacilityI) => {
        setFacilityEditModal({ ...facilityEditModal, [field]: e.target.value });
    }

    const fetchFacilityDetails = (id: number) => {
        setLoading(true);
        FacilityServiceApi.getItem(id).then(d => {
            if(d) {
                setFacilityEditModal(d);
            } else {
                setError("Error loading Facility details, please contact the admin team.");
            }
            setLoading(false);
        }).catch(e => {
            setError("Error loading Facility details, please contact the admin team.");
            console.log(e);
            setLoading(false);
        });
    }
  
    return (
        <ModalDialog
            open={openEditModal}
            onClose={handleClose}
            id="editNewModal"
            title={modalTitle()}
            maxWidth="sm"
            primaryButtonName="Save Changes"
            primaryButtonColor="warning"
            onOk={handleSaveChanges}
        >
            {
            loading ? <LinearProgress></LinearProgress> :
            (error ? 
            <Typography gutterBottom>
                {error}
            </Typography> :
            <Paper sx={{p: 2}} elevation={0}>
                <TextField
                    sx={{mb: 2}} fullWidth 
                    id="facilityEditModal-name" 
                    label="Facility Name" 
                    onChange={(e) => handleChangeInput(e, "name")}
                    variant="filled" value={facilityEditModal.name}/>
                <FormControl sx={{mb: 2}} fullWidth component="fieldset" 
                    onChange={(e: any) => handleChangeInput(e, "type")}>
                    <RadioGroup row aria-label="type" name="row-radio-buttons-group" value={facilityEditModal.type}>
                        <FormControlLabel value="range" control={<Radio />} label="Range" />
                        <FormControlLabel value="indoor" control={<Radio />} label="Indoor" />
                    </RadioGroup>
                </FormControl>
                <TextField sx={{mb: 2}} fullWidth id="address" label="Address" variant="filled" value={facilityEditModal.address}
                    onChange={(e) => handleChangeInput(e, "address")}/>
            </Paper>)
            }
        </ModalDialog>
    );
}

export default EditModal;