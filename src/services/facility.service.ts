import { getServiceFactory, ServiceTypeEnum } from "./factory";

const FacilityServiceApi = getServiceFactory(ServiceTypeEnum.LOCAL_STORAGE);

export default FacilityServiceApi;