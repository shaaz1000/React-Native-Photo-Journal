import ActionTypes from "../constant"

const initialState = {
    ClimateInfo : "",
    LocationInfo : ""
}

const DataReducer = (state= initialState, action) => {
    switch (action.type){
        case ActionTypes.SET_LOCATION_INFO : 
            return Object.assign({},state,{
                LocationInfo : action.payload
            })
        
        case ActionTypes.SET_CLIMATE_INFO : 
            return Object.assign({},state,{
                ClimateInfo : action.payload
        })

        default : 
        return state
    }
}

export default DataReducer;