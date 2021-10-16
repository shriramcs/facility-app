import { Grid } from '@mui/material';
import * as React from 'react';
import { FacilityI } from '../../types/Facility.type';
import FacilityCard from '../FacilityCard/FacilityCard';

type Props = {
    facilityListData: FacilityI[]
};

const FacilitList: React.FC<Props> = ({facilityListData}) => {

    const NoData = () => (<div style={{textAlign: 'center', padding: "1rem"}}>
        No Failities found. Please click on above button to start creating new facilities
    </div>);

    return (
        <div>
            {!(facilityListData && facilityListData.length) ?
                <NoData /> : 
                (
                    <Grid container spacing={2}>
                    {
                        facilityListData.map((d, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <FacilityCard facility={d}></FacilityCard>
                            </Grid>
                        ))
                    }
                    </Grid>
                )
            }
        </div>
    );
};

export default FacilitList;