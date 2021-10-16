import axios from 'axios';
import { FacilityI } from '../types/Facility.type';
const baseUrl = '';


const callApi = (
    method= 'get',
    port = '',
    apiPath = '',
    params = {},
    headers = {},
    responseType = 'json'
) => {
    return axios.create();
};

const facilitiesApi = {
    getFacilities: () => {
        return callApi(baseUrl + '/facilities');
    },
    updateFacility: (data: FacilityI) => {
        return callApi(baseUrl + '/facilities');
    }

}

export { facilitiesApi };