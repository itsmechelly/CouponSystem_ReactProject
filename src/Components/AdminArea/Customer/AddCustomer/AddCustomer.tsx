import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./AddCustomer.css";
import { Button, ButtonGroup, IconButton, InputAdornment, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { Add, ClearAll, Send, Visibility, VisibilityOff } from "@material-ui/icons";
import CustomerModel from "../../../../Models/CustomerModel";
import { ClientType } from "../../../../Models/UserModel";
import { customerAddedAction } from "../../../../Redux/CustomersState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/jwtAxios";
import notify from "../../../../Services/Notification";

interface AddCustomerState {
    showPassword: boolean;
}

function AddCustomer(): JSX.Element {

    let { register, handleSubmit, formState: { errors } } = useForm<CustomerModel>({ mode: "all" });
    let history = useHistory();
    const [state, setState] = useState<AddCustomerState>({ showPassword: false });

    useEffect(() => {
        if (store.getState().AuthState.user?.clientType !== ClientType.ADMIN) {
            notify.error("Please log in");
            history.push("/login");
        }
    }, []);

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };

    async function send(customer: CustomerModel) {

        try {
            const response = await jwtAxios.post<CustomerModel>(globals.urls.addCustomer, customer);
            const addedCustomer = response.data;
            store.dispatch(customerAddedAction(addedCustomer));
            notify.success("Customer has been added! customer name: " + addedCustomer.firstName + " " + addedCustomer.lastName);
            history.push("/admin/getAllCustomers");
        } catch (err) {
            notify.error(err);
            // if (err.response.data.status === 401) {
            //     history.push("/logout");
            // }
        }
    }

    return (
        <div className="AddCustomer">
            <div className="Container">

                <Add />
                <Typography variant="h3" className="Headline">
                    Add Customer
                </Typography>

                <form onSubmit={handleSubmit(send)}>

                    <TextField
                        label="Customer First Name"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        autoFocus
                        {...register("firstName", {
                            required: { value: true, message: "Missing first name." },
                            minLength: { value: 2, message: "First name is too short, should be at least 2 characters." },
                            pattern: { value: /^[a-zA-Z0-9]+$/gi, message: "First name is not valid, only letters and numbers are permitted." }
                        })}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />

                    <TextField
                        label="Customer Last Name"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        {...register("lastName", {
                            required: { value: true, message: "Missing last name." },
                            minLength: { value: 2, message: "Last name is too short, should be at least 2 characters." },
                            pattern: { value: /^[a-zA-Z0-9]+$/gi, message: "Last name is not valid, only letters and numbers are permitted." }
                        })}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />

                    <TextField
                        label="Customer Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="email"
                        autoComplete="email"
                        {...register("email", {
                            required: { value: true, message: "Missing email." },
                            pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: "Email is not valid." }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        label="Customer Password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        autoComplete="current-password"
                        {...register("password", {
                            required: { value: true, message: "Missing password." },
                            minLength: { value: 4, message: "Password too short, should be at least 4 characters." },
                            pattern: { value: /^[a-zA-Z0-9]+$/gi, message: "Password is not valid, only letters and numbers are permitted." }
                        })}
                        type={state.showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword} edge="end">
                                        {state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                        }}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <ButtonGroup className="Group" variant="text" fullWidth>

                        <Button
                            className="A"
                            startIcon={<Send />}
                            type="submit"
                            color="primary"
                            variant="contained">
                            Confirm
                        </Button>

                        <Button
                            className="B"
                            startIcon={<ClearAll />}
                            type="reset"
                            color="secondary"
                            variant="contained">
                            Reset
                        </Button>

                    </ButtonGroup>

                </form>

            </div>
        </div >
    );
}

export default AddCustomer;