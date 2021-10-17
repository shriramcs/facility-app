import { Grid } from '@mui/material';
import React from 'react';
import { FacilityI } from '../../types/Facility.type';
import DeleteModal from '../DeleteModal';
import FacilityCard from '../FacilityCard/FacilityCard';

type Props = {
    facilityListData: FacilityI[]  | null | undefined;
    refreshList: () => void;
};

const FacilitList: React.FC<Props> = ({facilityListData, refreshList}) => {

    const [deleteFacility, setDeleteFacility] = React.useState<FacilityI>();
    const handleDeleteFacility = (facility: FacilityI) => {
        setDeleteFacility(facility);
    } 

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
                                <FacilityCard
                                    facility={d}
                                    onDeleteFacility={() => handleDeleteFacility(d)}
                                ></FacilityCard>
                            </Grid>
                        ))
                    }
                    </Grid>
                )
            }
            {deleteFacility && <DeleteModal facility={deleteFacility} refreshList={refreshList}></DeleteModal> }
        </div>
    );
};

export default FacilitList;