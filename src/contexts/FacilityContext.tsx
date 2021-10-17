import React, { useContext, useEffect, useReducer } from "react";
import { FETCH_FAILURE_MESSAGE } from "../common/constants";
import FacilityServiceApi from "../services/facility.service";
import { FacilityI } from "../types/Facility.type";

export enum FacilityActionTypeEnum {
    "FACILITY_SUCCESS",
    "FACILITY_FAILED",
    "FACILITY_FETCH"
}

type FacilityActions =
  | { type: FacilityActionTypeEnum.FACILITY_SUCCESS; payload: FacilityI[] }
  | { type: FacilityActionTypeEnum.FACILITY_FAILED; payload: string }
  | { type: FacilityActionTypeEnum.FACILITY_FETCH};

interface FacilityStateI {
    facilities?: FacilityI[] | null;
    isLoading?: boolean;
    error?: string;
}

interface FacilityContextI extends FacilityStateI {
    dispatch: React.Dispatch<FacilityActions>;
    fetchFacilities?: any;
}

const FacilityContext = React.createContext<FacilityContextI>({
    facilities: [] as FacilityI[],
    isLoading: false,
    error: "",
    dispatch: () => {}
});

const useFacilityContext = () => {
    return useContext(FacilityContext);
};

type FR = (state: FacilityStateI, action: FacilityActions) => FacilityStateI;

const facilityReducer: FR = (state: FacilityStateI, action: FacilityActions) => {
    switch (action.type) {
      case FacilityActionTypeEnum.FACILITY_SUCCESS:
        return {
          ...state,
          isLoading: false,
          facilities: action.payload,
          error: ""
        };
      case FacilityActionTypeEnum.FACILITY_FAILED:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          facilities: [],
        };
      case FacilityActionTypeEnum.FACILITY_FETCH:
        return {
          ...state,
          isLoading: true,
          facilities: [],
          error: ""
        };
  
      default:
        return state;
    }
  };

  const FacilityProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(facilityReducer, {
      facilities: [],
      isLoading: false,
      error: ""
    });

    let fetchFacilities = async () => {
        dispatch({ type: FacilityActionTypeEnum.FACILITY_FETCH });
        try{
            const d = await FacilityServiceApi.getList();
            if(d){
                dispatch({ type: FacilityActionTypeEnum.FACILITY_SUCCESS, payload: d });
            } else {
                dispatch({ type: FacilityActionTypeEnum.FACILITY_FAILED, payload: FETCH_FAILURE_MESSAGE});
            }
        } catch(e: any) {
            dispatch({ type: FacilityActionTypeEnum.FACILITY_FAILED, payload: FETCH_FAILURE_MESSAGE + e.message});
        }
    }
  
    useEffect(() => {
        fetchFacilities();
    }, []);
  
    return (
      <FacilityContext.Provider
        value={{
          facilities: state.facilities,
          isLoading: state.isLoading,
          error: state.error,
          dispatch,
          fetchFacilities
        }}
      >
        {children}
      </FacilityContext.Provider>
    );
  };
  
  export { FacilityProvider, FacilityContext, useFacilityContext };