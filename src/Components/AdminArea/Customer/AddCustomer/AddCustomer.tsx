import { Button, ButtonGroup, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Add, ClearAll, Send, Visibility, VisibilityOff } from "@material-ui/icons";
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CustomerModel from "../../../../Models/CustomerModel";
import { ClientType } from "../../../../Models/UserModel";
import { customerAddedAction } from "../../../../Redux/CustomersState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/jwtAxios";
import notify from "../../../../Services/Notification";
import "./AddCustomer.css";

interface AddCustomerState {
    showPassword: boolean;
}

function AddCustomer(): JSX.Element {

    let { register, handleSubmit, formState: { errors } } = useForm<CustomerModel>({ mode: "all" });
    let history = useHistory();
    const [state, setState] = useState<AddCustomerState>({ showPassword: false });
    const classes = useStyles();

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

                <AddIcon />
                <Typography variant="h3" className="Headline">
                    Add Customer
                </Typography>

                <form onSubmit={handleSubmit(send)}>

                    <TextField
                        label="Customer First Name"
                        variant="outlined"
                        autoFocus
                        margin="normal"
                        fullWidth
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
                        // InputProps={{
                        //     endAdornment:
                        //         <InputAdornment position="end">
                        //             <IconButton
                        //                 aria-label="toggle password visibility"
                        //                 onClick={handleClickShowPassword} edge="end">
                        //                 {state.showPassword ? <Visibility /> : <VisibilityOff />}
                        //             </IconButton>
                        //         </InputAdornment>
                        // }}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <ButtonGroup>
                        {/* <ButtonGroup variant="text"> */}

                        <Button
                            startIcon={<SendIcon />}
                            type="submit"
                            color="primary"
                            variant="contained"
                            className={classes.submit}>
                            Confirm
                        </Button>

                        <Button
                            startIcon={<ClearAllIcon />}
                            type="reset"
                            color="primary"
                            variant="contained"
                            className={classes.submit}>
                            Reset
                        </Button>

                    </ButtonGroup>

                </form>

            </div>
        </div >
    );
}

export default AddCustomer;

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