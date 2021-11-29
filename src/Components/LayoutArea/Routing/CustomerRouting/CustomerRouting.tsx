import { Switch, Route } from "react-router-dom";
import CustomerHome from "../../../CustomerArea/CustomerHome/CustomerHome";
import GetAllCustomerCouponsByCategory from "../../../CustomerArea/GetAllCustomerCouponsByCategory/GetAllCustomerCouponsByCategory";
import GetAllCouponsByMaxPrice from "../../../CustomerArea/GetAllCouponsByMaxPrice/GetAllCouponsByMaxPrice";
import GetAllCustomerCoupons from "../../../CustomerArea/GetAllCustomerCoupons/GetAllCustomerCoupons";
import GetCustomerDetails from "../../../CustomerArea/GetCustomerDetails/GetCustomerDetails";

function CustomerRouting(): JSX.Element {
    return (
        <div className="CustomerRouting">
            <Switch>
                <Route path="/customer" component={CustomerHome} exact />
                <Route path="/customer/getAllCustomerCoupons" component={GetAllCustomerCoupons} exact />
                <Route path="/customer/getAllCouponsByCategory" component={GetAllCustomerCouponsByCategory} exact />
                <Route path="/customer/getAllCouponsUnderMaxPrice" component={GetAllCouponsByMaxPrice} exact />
                <Route path="/customer/getCustomerDetails" component={GetCustomerDetails} exact />
            </Switch>
        </div>
    );
}

export default CustomerRouting;
