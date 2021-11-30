import { Button, ButtonGroup, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import { ClientType } from "../../../../Models/UserModel";
import { customerUpdatedAction } from "../../../../Redux/CustomersState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/jwtAxios";
import notify from "../../../../Services/Notification";
import "./UpdateCustomer.css";

interface AddCustomerState {
    showPassword: boolean;
}

function UpdateCustomer(): JSX.Element {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<CustomerModel>({ mode: "all" });
    const history = useHistory();
    const [state, setState] = useState<AddCustomerState>({ showPassword: false });
    const classes = useStyles();

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };

    const { id } = useParams<{ id: string }>();
    const [customer] = useState(store.getState().CustomersState.customers.find(c => c.id === +id));
    const customerInitial = { ...customer };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        switch (name) {
            case "firstName":
                setValue("firstName", value);
                break;
            case "lastName":
                setValue("lastName", value);
                break;
            case "email":
                setValue("email", value);
                break;
            case "password":
                setValue("password", value);
                break;
        }
    }

    useEffect(() => {
        try {
            if (store.getState().AuthState.user?.clientType !== ClientType.ADMIN) {
                notify.error("Please log in");
                history.push("/login");
            }
            if (customer) {
                setValue("id", customer.id);
                setValue("firstName", customer.firstName);
                setValue("lastName", customer.lastName);
                setValue("email", customer.email);
                setValue("password", customer.password);
            }
        } catch (err) {
            notify.error(err);
        }
    }, [customer, setValue]);

    async function send(customer: CustomerModel) {
        if (!isCustomerDifferent(customerInitial, customer)) {
            notify.error("No changes were made!");
            return;
        }
        try {
            const response = await jwtAxios.put<CustomerModel>(globals.urls.updateCustomer, customer);
            store.dispatch(customerUpdatedAction(response.data));
            notify.success("Customer has been updated!");
            history.push("/admin/getAllCustomers");
        } catch (err) {
            notify.error(err);
            // if (err.response.data.status === 401) {
            //     history.push("/logout");
            // }
        }
    }

    function isCustomerDifferent(customerBefore: CustomerModel, customer: CustomerModel) {
        let isDiff: boolean = false;

        Object.entries(customer).forEach(afterEntry => {
            if (isDiff) return;
            const beforeEntry = Object.entries(customerBefore).find(bEntry => afterEntry[0] === bEntry[0])
            if (!(afterEntry.toString() === beforeEntry.toString())) {
                isDiff = true;
            }
        });
        return isDiff;
    }

    return (

        <div className="UpdateCustomer">
            <div className="Container">

                <Typography variant="h3" className="Headline">
                    {/* <Edit /> */}
                    Update Customer
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
                            minLength: { value: 2, message: "First Name is too short, should be at least 2 characters." },
                            pattern: { value: /^[a-zA-Z0-9]+$/gi, message: "First name is not valid, only letters are permitted." }
                        })}
                        defaultValue={customer?.firstName}
                        inputProps={{ onChange: handleChange }}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                    <br />

                    <TextField
                        label="Customer Last Name"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        {...register("lastName", {
                            required: { value: true, message: "Missing last name." },
                            minLength: { value: 2, message: "Last Name is too short, should be at least 2 characters." },
                            pattern: { value: /^[a-zA-Z0-9]+$/gi, message: "Last name is not valid, only letters are permitted." }
                        })}
                        defaultValue={customer?.lastName}
                        inputProps={{ onChange: handleChange }}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />
                    <br />

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
                        defaultValue={customer?.email}
                        inputProps={{ onChange: handleChange }}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <br />

                    <TextField
                        label="Customer Password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        autoComplete="current-password"
                        {...register("password", {
                            required: { value: true, message: "Missing password." },
                            minLength: { value: 4, message: "Password too short, should be at least 4 characters." },
                            pattern: { value: /^[a-zA-Z0-9]+$/gi, message: "Use only the following characters: [a-zA-Z0-9]." }
                        })}
                        type={state.showPassword ? 'text' : 'password'}
                        defaultValue={customer?.password}
                        inputProps={{ onChange: handleChange }}
                        // InputProps={{
                        //     endAdornment:
                        //         <InputAdornment position="end">
                        //             <IconButton
                        //                 aria-label="toggle password visibility"
                        //                 onClick={handleClickShowPassword} edge="end">
                        //                 {state.showPassword ? <Visibility /> : <VisibilityOff />}
                        //             </IconButton>
                        //         </InputAdornment>,
                        //     onChange: handleChange
                        // }}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <br />

                    <ButtonGroup>
                        {/* <ButtonGroup className="Group" variant="text" fullWidth> */}

                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            className={classes.submit}>
                            Confirm
                        </Button>

                        <Button
                            type="reset"
                            color="primary"
                            variant="contained"
                            className={classes.submit}>
                            Reset
                        </Button>

                    </ButtonGroup>

                </form>

            </div>
        </div>
    );
}

export default UpdateCustomer;

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '(100vh - 40px)',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '90%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        marginRight: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        borderRadius: '0px',
    },
}));