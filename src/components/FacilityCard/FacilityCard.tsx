import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import {
    useHistory
} from "react-router-dom";

import { FacilityI } from "../../types/Facility.type";

const muiStyles: any = makeStyles((theme: any) => ({
    card: {
        '&:hover': {
            cursor: 'pointer',
        }
    },
}));

interface Props {
    facility: FacilityI;
    mode?: string
}
const FacilityCard: React.FC<Props> = (props) => {
    const { facility, mode } = props;
    const history = useHistory();
    const muiClasses = muiStyles();
    
    const handleDelete = () => {
        console.log("delete");
    }
    const handleEdit = () => {
        console.log("Edit");
        history.push("/1");
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
                    <Button size="small" onClick={handleEdit} >Edit</Button>
                    <Button size="small" onClick={handleDelete} >delete</Button>
                </CardActions>
            }
            
    </Card>
    )
}
export default FacilityCard;

