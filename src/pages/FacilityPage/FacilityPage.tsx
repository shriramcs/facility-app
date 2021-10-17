import { Alert, Button, LinearProgress, Typography } from '@mui/material';
import * as React from 'react';
import FacilitList from '../../components/FacilityList/FacilityList';
import FacilityPageWrapper from './FacilityPage.style';
import FacilityServiceApi from '../../services/facility.service';
import { FacilityI } from '../../types/Facility.type';
import { Switch, useHistory, Route, useParams } from 'react-router-dom';
import EditModal from '../../components/EditModal/EditModal';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { ROUTE_FACILITY_NEW_URL } from '../../common/constants';

type Props = {};

const FacilityPage: React.FC<Props> = () => {
    const pageTitle = 'Facility List';
    const [facilityListData, setFacilityListData] = React.useState<FacilityI[]>([] as FacilityI[]);
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const history = useHistory();
    const {id}: any = useParams();

    React.useEffect(() => {
        console.log("refreshing list");

        fetchListData();
    }, [id]);

    const fetchListData = () => {
        setLoading(true);
        FacilityServiceApi.getList().then((d: FacilityI[]) => {
            setLoading(false);
            setFacilityListData(d);
        })
        .catch(e => {
            setLoading(false);
            console.log("ERROR", e);
            setError(e.message);
        });
    }

    const handleCreate = () => {
        history.push(ROUTE_FACILITY_NEW_URL);
    }

    const handleRefresh = () => {
        fetchListData();
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
                loading ? <LinearProgress></LinearProgress> :
                <FacilitList facilityListData={facilityListData} refreshList={handleRefresh}></FacilitList>
            }

            <Switch>
                <Route path="/facility/:id" children={<EditModal facility={{} as FacilityI} refreshList={handleRefresh} />} />
            </Switch>
        </FacilityPageWrapper>
    );
};

export default FacilityPage;