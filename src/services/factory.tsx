import { BackendServiceI } from "../types/common.types";
import { FacilityI } from "../types/Facility.type";
import { LocalStorageService } from "./LocalStorage.service";
import { RestApiService } from "./Rest.service";

export interface DataModificationResponseI{
    status: "SUCCESS" | "FAILURE";
    message: string;
}

export enum ServiceTypeEnum {
    "LOCAL_STORAGE",
    "REST_API"
};

export const getServiceFactory = (type: ServiceTypeEnum): BackendServiceI<FacilityI> => {
    switch(type){
        case ServiceTypeEnum.LOCAL_STORAGE: return new LocalStorageService<FacilityI>();
        case ServiceTypeEnum.REST_API: return new RestApiService<FacilityI>();
        default: throw Error("Specify service type");
    }
}