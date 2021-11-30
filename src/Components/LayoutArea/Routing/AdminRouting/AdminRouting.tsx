import { Route, Switch } from "react-router-dom";
import AddCompany from "../../../AdminArea/Company/AddCompany/AddCompany";
import AdminHome from "../../../AdminArea/AdminHome/AdminHome";
import DeleteCompany from "../../../AdminArea/Company/DeleteCompany/DeleteCompany";
import GetAllCompanies from "../../../AdminArea/Company/GetAllCompanies/GetAllCompanies";
import GetOneCompany from "../../../AdminArea/Company/GetOneCompany/GetOneCompany";
import DeleteCustomer from "../../../AdminArea/Customer/DeleteCustomer/DeleteCustomer";
import GetAllCustomers from "../../../AdminArea/Customer/GetAllCustomers/GetAllCustomers";
import GetOneCustomer from "../../../AdminArea/Customer/GetOneCustomer/GetOneCustomer";
import UpdateCompany from "../../../AdminArea/Company/UpdateCompany/UpdateCompany";
import AddCustomer from "../../../AdminArea/Customer/AddCustomer/AddCustomer";
import UpdateCustomer from "../../../AdminArea/Customer/UpdateCustomer/UpdateCustomer";

function AdminRouting(): JSX.Element {
    return (
        <div className="AdminRouting">

            <Switch>
                <Route path="/admin" component={AdminHome} exact />
                <Route path="/admin/addCompany" component={AddCompany} exact />
                <Route path="/admin/updateCompany/:id" component={UpdateCompany} exact />
                <Route path="/admin/deleteCompany" component={DeleteCompany} exact />
                <Route path="/admin/getOneCompany/:id" component={GetOneCompany} exact />
                <Route path="/admin/getAllCompanies" component={GetAllCompanies} exact />

                {/* po */}
                <Route path="/admin/addCustomer" component={AddCustomer} exact />
                {/* po */}
                {/* <Route path="/admin/updateCustomer/:id" component={UpdateCustomer} exact /> */}
                <Route path="/admin/deleteCustomer" component={DeleteCustomer} exact />
                <Route path="/admin/getOneCustomer/:id" component={GetOneCustomer} exact />
                <Route path="/admin/getAllCustomers" component={GetAllCustomers} exact />
            </Switch>

        </div>
    );
}

export default AdminRouting;
