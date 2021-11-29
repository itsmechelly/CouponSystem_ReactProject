import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import { ClientType } from "../../../../Models/UserModel";
import { customersDownloadedAction } from "../../../../Redux/CustomersState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/jwtAxios";
import notify from "../../../../Services/Notification";
import CustomersCard from "../CustomersCard/CustomersCard";
import TotalCustomers from "../TotalCustomers/TotalCustomers";
import "./GetAllCustomers.css";

function GetAllCustomers(): JSX.Element {

    let history = useHistory();
    let [customers, setCustomers] = useState<CustomerModel[]>(store.getState().CustomersState.customers);

    useEffect(() => {
        let unSubscribeMe = store.subscribe(() => {
            setCustomers(store.getState().CustomersState.customers);
        })
        if (store.getState().AuthState.user?.clientType !== ClientType.ADMIN) {
            notify.error("Please log in");
            history.push("/login");
        }
        else if (store.getState().CustomersState.customers.length === 0) {
            getCustomers();
        }
        return function cleanup() {
            unSubscribeMe();
        }
    }, []);

    async function getCustomers() {
        try {
            let response = await jwtAxios.get<CustomerModel[]>(globals.urls.getAllCustomers);
            store.dispatch(customersDownloadedAction(response.data));
        } catch (error) {
            notify.error(error);
        }
    }

    return (
        <div className="GetAllCustomers">

            <div className="MainHeader">
                <h1>Get All Customer Coupons</h1>
                <p>Some text about who we are and what we do.</p>
                <p>Resize the browser window to see that this page is responsive by the way.</p>
            </div>

            <h1 className="BigTitle">ALL CUSTOMERS!!!</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                {customers.map(customer => (<CustomersCard key={customer.id} customer={customer} />))}
            </div>

            <TotalCustomers />

        </div>
    );
}

export default GetAllCustomers;