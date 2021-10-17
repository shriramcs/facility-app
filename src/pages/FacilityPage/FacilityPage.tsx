import { Alert, Button, LinearProgress, Typography } from '@mui/material';
import * as React from 'react';
import FacilitList from '../../components/FacilityList/FacilityList';
import FacilityPageWrapper from './FacilityPage.style';
import { FacilityI } from '../../types/Facility.type';
import { Switch, useHistory, Route, useParams } from 'react-router-dom';
import EditModal from '../../components/EditModal/EditModal';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { ROUTE_FACILITY_NEW_URL } from '../../common/constants';
import { useFacilityContext } from '../../contexts/FacilityContext';

type Props = {};

const FacilityPage: React.FC<Props> = () => {
    const { facilities, fetchFacilities, isLoading, error } = useFacilityContext();
    const pageTitle = 'Facility List';
    const history = useHistory();
    const handleCreate = () => {
        history.push(ROUTE_FACILITY_NEW_URL);
    }

    const handleRefresh = () => {
        fetchFacilities();
    }

    return (
        <FacilityPageWrapper>
            <div style={{display: 'flex', justifyContent: "space-between", marginBottom: "1rem"}}>
                <Typography variant="subtitle1" component="h6">
                    {pageTitle}
                </Typography>
                <Button
                    variant="contained"
                    className="classes.root"
                    style={{textTransform: 'none'}}
                    onClick={handleCreate}
                >
                    Create New Facility
                    <AddOutlinedIcon sx={{ml: 1}} />
                </Button>
            </div>
            
            {error && <Alert severity="error">{error}</Alert>}

            {
                isLoading ? <LinearProgress></LinearProgress> :
                <FacilitList facilityListData={facilities} refreshList={handleRefresh}></FacilitList>
            }

            <Switch>
                <Route path="/facility/:id" children={<EditModal facility={{} as FacilityI} refreshList={handleRefresh} />} />
            </Switch>
        </FacilityPageWrapper>
    );
};

export default FacilityPage;