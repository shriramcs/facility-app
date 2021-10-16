import { Card } from '@mui/material';
import * as React from 'react';
import { FacilityI } from '../../types/Facility.type';

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
                        facilityListData.map((d, index) => (
                            <Card key={index} style={{margin: "2rem"}}>
                                Name: {d.name || '-'}
                            </Card>
                        ))
                    )
            }

            
        </div>
    );
};

export default FacilitList;