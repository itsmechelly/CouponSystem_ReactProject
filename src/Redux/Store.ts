import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { companiesReducer } from "./CompaniesState";
import { customersReducer } from "./CustomersState";
import { couponsReducer } from "./CouponsState";

const reducers = combineReducers({
    AuthState: authReducer,
    CompaniesState: companiesReducer,
    CustomersState: customersReducer,
    CouponsState: couponsReducer,
});

const store = createStore(reducers);

export default store;