import {combineReducers} from "redux"
import DataReducer from "./dataInformationReducer"
const appReducer = combineReducers({
    DataReducer
})

const rootReducer = (state,action) => { return appReducer(state, action) }

export default rootReducer