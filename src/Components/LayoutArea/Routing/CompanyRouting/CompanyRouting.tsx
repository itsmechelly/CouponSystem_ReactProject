import { Route, Switch } from "react-router-dom";
import AddCompanyCoupon from "../../../CompanyArea/AddCompanyCoupon/AddCompanyCoupon";
import CompanyHome from "../../../CompanyArea/CompanyHome/CompanyHome";
import DeleteCompanyCoupon from "../../../CompanyArea/DeleteCompanyCoupon/DeleteCompanyCoupon";
import GetAllCompaniesCoupons from "../../../CompanyArea/GetAllCompaniesCoupons/GetAllCompaniesCoupons";
import GetAllCouponsByCategory from "../../../CompanyArea/GetAllCouponsByCategory/GetAllCouponsByCategory";
import GetAllCouponsByMaxPrice from "../../../CompanyArea/GetAllCouponsByMaxPrice/GetAllCouponsByMaxPrice";
import GetCompanyDetails from "../../../CompanyArea/GetCompanyDetails/GetCompanyDetails";
import UpdateCompanyCoupon from "../../../CompanyArea/UpdateCompanyCoupon/UpdateCompanyCoupon";

function CompanyRouting(): JSX.Element {
    return (
        <div className="CompanyRouting">
            <Switch>
                <Route path="/company" component={CompanyHome} exact />
                <Route path="/company/addCompanyCoupon" component={AddCompanyCoupon} exact />
                <Route path="/company/updateCompanyCoupon/:id" component={UpdateCompanyCoupon} exact />
                <Route path="/company/deleteCompanyCoupon/" component={DeleteCompanyCoupon} exact />
                <Route path="/company/getAllCompaniesCoupons" component={GetAllCompaniesCoupons} exact />
                <Route path="/company/getAllCouponsByCategory" component={GetAllCouponsByCategory} exact />
                <Route path="/company/getAllCouponsUnderMaxPrice" component={GetAllCouponsByMaxPrice} exact />
                <Route path="/company/getCompanyDetails" component={GetCompanyDetails} exact />
            </Switch>
        </div>
    );
}

export default CompanyRouting;
