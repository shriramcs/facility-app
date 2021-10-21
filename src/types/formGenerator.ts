// Each card represents a objects

// Each object should have uniq id field
export interface BaseModel {
    id: string;
}

// structure of a field: type of field and its reference property name
export interface FieldModel {
    field: string;
    displayName: string;
    controlType: "text" | "radio" | "dropdown" | "checkbox";
    referenceData?: ReferenceData[];
}

// reference data for radio/dropdown/checkboxes
export interface ReferenceData{
    code: string;
    description: string
}

// example of a Facility Form controls.
const  FacilityFormConfig: FieldModel[] = [
    {
        field: "facilityName",
        displayName: "Facility Name",
        controlType: "text"
    },
    {
        field: "facilityType",
        displayName: "Facility Type",
        controlType: "radio",
        referenceData: [
            {
                code: "range",
                description: "Range"
            },
            {
                code: "indoor",
                description: "Indoor"
            }
        ]
    },
    {
        field: "facilityAddress",
        displayName: "Facility Address",
        controlType: "text"
    }
]

// Type of object for Facility
export interface Facility extends BaseModel {
    facilityName: string;
    facilityType: 'range' | 'indoor'
    facilityAddress: string;
}

// example final data for facilities
const facilitiesData = [
    {
        id: "1",
        facilityName: "Fac Name 1",
        facilityType: 'range',
        facilityAddress: "#1, 2nd cross ,Bengaluru"
    },
    {
        id: "1",
        facilityName: "Fac Name 1",
        facilityType: 'range',
        facilityAddress: "#1, 2nd cross ,Bengaluru"
    }
]