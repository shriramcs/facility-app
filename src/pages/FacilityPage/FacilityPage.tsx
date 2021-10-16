import { Button, Typography } from '@mui/material';
import * as React from 'react';
import FacilityPageWrapper from './FacilityPage.style';

type Props = {};

const FacilityPage: React.FC<Props> = () => {
    const pageTitle = 'Facility List';
    const [facilityList] = React.useState([]);

    const NoData = () => (<div style={{textAlign: 'center', padding: "1rem"}}>No Failities found. Please click on above button to start creating new facilities</div>);

    return (
        <FacilityPageWrapper>
            <div style={{display: 'flex', justifyContent: "space-between", marginBottom: "1rem"}}>
                <Typography variant="subtitle1" component="h6">
                    {pageTitle}
                </Typography>
                <Button variant="contained" style={{textTransform: 'none'}}>Create New Facility</Button>
            </div>
            { !(facilityList && facilityList.length > 0) && <NoData /> }
            { (facilityList && facilityList.length > 0) && <div>List goes here</div> }
            
        </FacilityPageWrapper>
    );
};

export default FacilityPage;