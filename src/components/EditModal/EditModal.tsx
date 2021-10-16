import { Modal, Divider, Paper, TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CloseIcon from '@mui/icons-material/Close';
import { FacilityI } from "../../types/Facility.type";
import FacilityServiceApi from "../../services/facility.service";

interface Props {
    facility: FacilityI;
    mode: string;
    refreshList: () => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24
};

const EditModal: React.FC<Props> = props => {
    const {facility, mode, refreshList} = props;
    let { id }: any = useParams();
    const history = useHistory();
    const [openModal, setOpenModel] = React.useState<boolean>(false);
    const modalTitle = mode === 'edit' ? "Edit Information" : "New Information";

    const handleCancel = () => {
        setOpenModel(false);
        history.goBack();
    };
    const handleSaveChanges = () => {
        console.log(facility);

        //validate before submitting the form and close modal.
        if(facility){
            if(!(facility.name && facility.type && facility.address)){
                return;
            }
        }

        FacilityServiceApi.addItem(facility).then(d => {
            console.log("added successfully", d);
            setOpenModel(false);
            history.goBack();
            refreshList();
        })
        
    };
    const handleChangeName = (e: any) => {
        facility.name = e.target.value;
    }
    const handleChangeType = (e: any) => {
        facility.type = e.target.value;
    }
    const handleChangeAddress = (e: any) => {
        facility.address = e.target.value;
    }

    React.useEffect(() => {
        setOpenModel(!!id);
    }, [id]);
  
    return (
        <Modal
        open={openModal}
        onClose={handleCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div>
                <Typography variant="h5" component="div" sx={{p: 2}}>
                    {modalTitle}
                </Typography>
                <CloseIcon onClick={handleCancel} style={{position: "absolute", top: "20px", right: "1rem"}}></CloseIcon>
            </div>
            <Divider sx={{mt: 2, mb: 2}}/>
            <Paper sx={{p: 2}} elevation={0}>
                <TextField
                    sx={{mb: 2}} fullWidth 
                    id="facility-name" 
                    label="Facility Name" 
                    onChange={handleChangeName}
                    variant="filled" value={facility.name}/>
                <FormControl sx={{mb: 2}} fullWidth component="fieldset" 
                    onChange={handleChangeType}>
                    <RadioGroup row aria-label="type" name="row-radio-buttons-group" value={facility.type}>
                        <FormControlLabel value="range" control={<Radio />} label="Range" />
                        <FormControlLabel value="indoor" control={<Radio />} label="Indoor" />
                    </RadioGroup>
                </FormControl>
                <TextField sx={{mb: 2}} fullWidth id="address" label="Address" variant="filled" value={facility.address}
                    onChange={handleChangeAddress}/>
            </Paper>
            <Divider sx={{mt: 2, mb: 2}}/>
            <Paper sx={{p: 2}} elevation={0} style={{display: 'flex', gap: "0.5rem"}}>
                <Button variant="outlined" style={{flex: 1}} onClick={handleCancel}>Cancel</Button>
                <Button variant="contained" style={{flex: 1}} onClick={handleSaveChanges}>Save Changes</Button>
            </Paper>
        </Box>
      </Modal>
    );
}

export default EditModal;