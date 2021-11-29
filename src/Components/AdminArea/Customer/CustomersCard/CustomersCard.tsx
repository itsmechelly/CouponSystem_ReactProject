import happy from "../../../../Assets/Images/Happy.jpg";
import "./CustomersCard.css";
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import { customerDeletedAction } from "../../../../Redux/CustomersState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/jwtAxios";
import notify from "../../../../Services/Notification";

interface CustomersCardProps {
    customer: CustomerModel;
}

function CustomersCard(props: CustomersCardProps): JSX.Element {

    let history = useHistory();
    let { handleSubmit } = useForm<CustomerModel>();

    async function handleDelete(customer: CustomerModel) {
        try {
            const item = "Going to delete, sure? (change needed here!!!)";
            alert(item);

            let response = await jwtAxios.delete<number>(globals.urls.deleteCustomer + props.customer.id);
            store.dispatch(customerDeletedAction(response.data));
            notify.success("" + response.data);
            history.push("/admin/getAllCustomers");
        } catch (error) {
            notify.error(error);
        }
    }

    return (
        <div className="CustomersCard">
            <div className="Row">
                <div className="Column">
                    <div className="Card">

                        <img className="CustomerImg" src={happy} alt="Customer Image" />

                        <div className="Container">
                            <div className="CardData">
                                <h2>{props.customer.firstName} {props.customer.lastName}</h2>
                                <p className="CustomerId">Customer Id Number: {props.customer.id}</p>
                                <p>{props.customer.firstName}</p>
                                <p>{props.customer.lastName}</p>
                                <p>{props.customer.email}</p>
                                <p>{props.customer.password}</p>
                            </div>
                            <button className="Button"><NavLink to={"/admin/getOneCustomer/" + props.customer.id}>Get One </NavLink>Customer</button>
                            <button className="Button"><NavLink to={"/admin/updateCustomer/" + props.customer.id}>Update </NavLink>Customer</button>
                            <button className="Button" onClick={handleSubmit(handleDelete)}>Delete Customer</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomersCard;
