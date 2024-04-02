import { getproductsreducer } from "./Productsreducer";
import { combineReducers} from "redux";

const rootreducers = combineReducers({
    getproductsdata:getproductsreducer
});

export default rootreducers;