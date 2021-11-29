import { Typography, TextField, ButtonGroup, Button } from "@material-ui/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import { ClientType } from "../../../../Models/UserModel";
import { customerDeletedAction } from "../../../../Redux/CustomersState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/jwtAxios";
import notify from "../../../../Services/Notification";

import "./DeleteCustomer.css";

function DeleteCustomer(): JSX.Element {

    let history = useHistory();
    let { register, handleSubmit } = useForm<CustomerModel>();

    useEffect(() => {
        if (store.getState().AuthState.user?.clientType !== ClientType.ADMIN) {
            notify.error("Please log in");
            history.push("/login");
        } else {
        }
    }, []);

    async function handleDelete(customer: CustomerModel) {
        try {
            let response = await jwtAxios.delete<number>(globals.urls.deleteCustomer + customer.id);
            store.dispatch(customerDeletedAction(response.data));
            notify.success("" + response.data);
            history.push("/admin/getAllCustomers");
        } catch (error) {
            notify.error(error);
        }
    }

    return (
        <div className="DeleteCustomer">
            <div className="Container">

                <Typography variant="h3" className="Headline">
                    Delete Customer
                </Typography>

                <form onSubmit={handleSubmit(handleDelete)}>

                    <TextField
                        label="Customer Id"
                        type="text"
                        name="id"
                        variant="outlined"
                        margin="normal"
                        // autoFocus
                        required
                        {...register("id")}
                    />

                    <ButtonGroup className="Group" variant="text" fullWidth>
                        <Button className="A" type="submit" color="primary" variant="contained">
                            Confirm
                        </Button>
                        <Button className="B" type="reset" color="secondary" variant="contained">
                            Reset
                        </Button>
                    </ButtonGroup>

                </form>

            </div>
        </div>
    );
}

export default DeleteCustomer;
