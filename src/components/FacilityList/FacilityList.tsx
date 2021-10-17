import { Grid } from '@mui/material';
import React from 'react';
import { useFacilityContext } from '../../contexts/FacilityContext';
import { FacilityI } from '../../types/Facility.type';
import DeleteModal from '../DeleteModal';
import FacilityCard from '../FacilityCard/FacilityCard';
import PaginationComp from '../Pagination/PaginationComp';

type Props = {
    facilityListData: FacilityI[]  | null | undefined;
    refreshList: (page: number) => void;
};

const FacilitList: React.FC<Props> = ({facilityListData, refreshList}) => {

    const { pagination } = useFacilityContext();
    const [deleteFacility, setDeleteFacility] = React.useState<FacilityI>();

    const handleDeleteFacility = (facility: FacilityI) => {
        setDeleteFacility(facility);
    } 

    const onChange = (page: number, pageSize: number) => {
        refreshList(page);
    };

    const NoData = () => (<div style={{textAlign: 'center', padding: "1rem"}}>
        No Failities found. Please click on above button to start creating new facilities
    </div>);

    return (
        <div>
            {!(facilityListData && facilityListData.length) ?
                <NoData /> : 
                (
                    <>
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
                        {pagination.pages > 0 && <div style={{marginTop: "1rem"}}>
                            <PaginationComp page={pagination.page} onChange={onChange} pageCount={pagination.pages}></PaginationComp>
                        </div>}
                    </>
                )
            }
            {deleteFacility && <DeleteModal facilityId={deleteFacility.id} refreshList={refreshList}></DeleteModal> }
        </div>
    );
};

export default FacilitList;