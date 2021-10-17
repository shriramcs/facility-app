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
import { EMPTY_STRING, FACILITY_EDIT_MODAL_TITLE, ROUTE_FACILITY_URL } from "../../common/constants";

interface Props {
    facility: FacilityI;
    refreshList: (page: number) => void
}

export enum modeEnum{
    'new',
    'edit'
};

const NEW_FAILITY: FacilityI = {
    address: "",
    id: "",
    name: "",
    type: 'range'
};

const EditModal: React.FC<Props> = props => {
    const {refreshList} = props;
    let { id }: any = useParams();
    const history = useHistory();
    const [openEditModal, setOpenEditModal] = useState(false);
    const [mode, setMode] = React.useState<modeEnum>(modeEnum.new);
    const [facilityEditModal, setFacilityEditModal] = React.useState<FacilityI>(NEW_FAILITY);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(EMPTY_STRING);

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
        } catch(e: any) {
            setError(e.message);
        }
        return () => {
            setOpenEditModal(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const modalTitle = () => mode === modeEnum.edit ? FACILITY_EDIT_MODAL_TITLE : FACILITY_EDIT_MODAL_TITLE;
    const handleClose = () => {
        setOpenEditModal(false);
        history.push(ROUTE_FACILITY_URL);
    };
    const handleSaveChanges = () => {
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
            history.push(ROUTE_FACILITY_URL);
            refreshList(1);
        }).catch(e => {
            setLoading(false);
            console.log(e);
        })
    };
    
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof FacilityI) => {
        setFacilityEditModal({ ...facilityEditModal, [field]: e.target.value });
    }

    const fetchFacilityDetails = async (id: number) => {
        setLoading(true);
        try{
            const facItem = await FacilityServiceApi.getItem(id);
            if(facItem) {
                setFacilityEditModal(facItem);
            } else {
                setError("Error loading Facility details, please contact the admin team.");
            }
        } catch(e: any) {
            setError("Error loading Facility details, please contact the admin team. " + e.message);
        } finally {
            setLoading(false);
        }
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