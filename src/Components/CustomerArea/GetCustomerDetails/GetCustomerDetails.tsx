import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import { ClientType } from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./GetCustomerDetails.css";

function GetCustomerDetails(): JSX.Element {

    const history = useHistory();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        if (store.getState().AuthState.user?.clientType !== ClientType.CUSTOMER) {
            notify.error("Please log in");
            history.push("/login");
        }
        getCustomerDetails();
    }, []);

    async function getCustomerDetails() {
        try {
            let response = await jwtAxios.get<CustomerModel>(globals.urls.getCustomerDetails);
            // store.dispatch(couponsDownloadedAction(response.data));
            const customerSent = response.data;
            setCustomer(customerSent);
        } catch (error) {
            notify.error(error);
        }
    }

    return (

        <div className="GetCustomerDetails">

            <div className="Container">
                <div className="TextField">

                    {customer != null && (
                        <>
                            <br />
                            <p className="CustomerFullName">{customer.firstName} {customer.lastName}</p>
                            <p>First Name: {customer.firstName}</p>
                            <p>Last Name: {customer.lastName}</p>
                            <p className="DetailsInMin">Email: {customer.email}</p>
                            <p className="DetailsInMin">Password: {customer.password}</p>
                            <br />
                        </>
                    )}
                </div>
            </div>

        </div>

    );
}

export default GetCustomerDetails;
