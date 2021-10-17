import { DeleteOutline } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from "@mui/styles";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React from "react";
import {
    useHistory
} from "react-router-dom";

import { FacilityI } from "../../types/Facility.type";
import { ROUTE_FACILITY_URL, SLASH } from "../../common/constants";

const muiStyles: any = makeStyles((theme: any) => ({
    card: {
        '&:hover': {
            cursor: 'pointer',
        }
    },
}));

interface Props {
    facility: FacilityI;
    mode?: string;
    onDeleteFacility: () => void
}
const FacilityCard: React.FC<Props> = (props) => {
    const { facility, mode, onDeleteFacility } = props;
    const history = useHistory();
    const muiClasses = muiStyles();
    
    const handleDelete = () => {
        console.log("delete");
        onDeleteFacility()
    }
    const handleEdit = () => {
        console.log("Edit");
        try{
            const id = parseInt(facility.id);
            if(!isNaN(id)){
                history.push(ROUTE_FACILITY_URL + SLASH + facility.id);
            }
        } catch(e) {
            console.log(e);
        };
        
    }

    return (
        <Card className={muiClasses.card}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {facility.name || "-"}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {facility.type || "-"}
                </Typography>
                <Typography variant="body2">
                    {facility.address || "-"}
                </Typography>
            </CardContent>
            {
                mode !== "edit" && <CardActions>
                    <Button size="small" style={{flex: 1}} onClick={handleEdit} >
                        Edit
                        <EditIcon sx={{ml: 1}}/>
                    </Button>
                    <Button size="small" style={{flex: 1}} color="error" onClick={handleDelete} >
                        delete
                        <DeleteOutlineIcon sx={{ml: 1}} />
                    </Button>
                </CardActions>
            }
            
    </Card>
    )
}
export default FacilityCard;

