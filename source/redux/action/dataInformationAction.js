import ActionTypes from "../constant/index"

export const LocationInfo = (params) => {
    return{
        type : ActionTypes.SET_LOCATION_INFO,
        payload : params
    }
}

export const ClimateInfo = (params) => {
    return{
        type : ActionTypes.SET_CLIMATE_INFO,
        payload : params
    }
}