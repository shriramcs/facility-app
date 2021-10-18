export interface BaseModelI {
    id: string;
};


export interface FacilityI extends BaseModelI {
    name: string;
    type: 'range' | 'indoor';
    address: string;
};
