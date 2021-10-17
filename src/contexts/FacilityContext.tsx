import React, { useContext, useEffect, useReducer } from "react";
import { FETCH_FAILURE_MESSAGE } from "../common/constants";
import FacilityServiceApi from "../services/facility.service";
import { FacilityI } from "../types/Facility.type";

export enum FacilityActionTypeEnum {
    "FACILITY_SUCCESS",
    "FACILITY_FAILED",
    "FACILITY_FETCH"
}

export interface payloadI {
  data: FacilityI[]
}

export interface PaginationI {
    pageSize: number;
    pages: number;
    page: number;
}

export type FacilityActions =
  | { type: FacilityActionTypeEnum.FACILITY_SUCCESS; payload: {data: FacilityI[], pagination: PaginationI} }
  | { type: FacilityActionTypeEnum.FACILITY_FAILED; payload: string }
  | { type: FacilityActionTypeEnum.FACILITY_FETCH};

export interface FacilityStateI {
    facilities?: FacilityI[] | null;
    isLoading?: boolean;
    error?: string;
    pagination: PaginationI
}

export interface FacilityContextI extends FacilityStateI {
    dispatch: React.Dispatch<FacilityActions>;
    fetchFacilities?: any;
}

const FacilityContext = React.createContext<FacilityContextI>({
    facilities: [] as FacilityI[],
    isLoading: false,
    error: "",
    pagination: {
      pageSize: 6,
      pages: 10,
      page: 1
    },
    dispatch: () => {}
});

const useFacilityContext = () => {
    return useContext(FacilityContext);
};

type FR = (state: FacilityStateI, action: FacilityActions) => FacilityStateI;

const facilityReducer: FR = (state: FacilityStateI, action: FacilityActions) => {
    switch (action.type) {
      case FacilityActionTypeEnum.FACILITY_SUCCESS:
        // const begin = (state.pagination.page - 1) * state.pagination.pageSize;
        // const end = begin + state.pagination.pageSize;

        return {
          ...state,
          isLoading: false,
          facilities: action.payload.data, //.slice(begin, end),
          error: "",
          pagination: {...state.pagination, ...action.payload.pagination}
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
      error: "",
      pagination: {
        pageSize: 6,
        pages: 0,
        page: 1
      }
    });

    let fetchFacilities = async () => {
        dispatch({ type: FacilityActionTypeEnum.FACILITY_FETCH });
        try{
            const d = await FacilityServiceApi.getList();
            if(d){
                dispatch({ type: FacilityActionTypeEnum.FACILITY_SUCCESS, payload: {
                  data: d,
                  pagination: {} as PaginationI}
                });
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
          pagination: state.pagination,
          dispatch,
          fetchFacilities
        }}
      >
        {children}
      </FacilityContext.Provider>
    );
  };
  
  export { FacilityProvider, FacilityContext, useFacilityContext };