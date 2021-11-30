import { Grid, CssBaseline, Paper, Avatar, Typography, TextField, Select, MenuItem, FormControlLabel, Checkbox, Button, Box, makeStyles, ButtonGroup } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import registerImage from "../../../Assets/Images/Login.jpg";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Link from '@material-ui/core/Link';
import UserModel from "../../../Models/UserModel";
import { registerAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import "./Register.css";
import CustomerModel from "../../../Models/CustomerModel";
import jwtAxios from "../../../Services/jwtAxios";
import { customerAddedAction } from "../../../Redux/CustomersState";
import { useEffect, useState } from "react";

interface AddCustomerState {
    showPassword: boolean;
}

function Register(): JSX.Element {

    let { register, handleSubmit, formState: { errors } } = useForm<CustomerModel>({ mode: "all" });
    let history = useHistory();
    const [state, setState] = useState<AddCustomerState>({ showPassword: false });
    const classes = useStyles();

    useEffect(() => {
        notify.success("NOTICE! Will be activated soon. Meanwhile USE:");
        notify.success("Admin: admin@admin.com admin");
        notify.success("Company: zootAllures@company.com zootAllures");
        notify.success("Customer: cust1@cust.com 1111");
    }, []);

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };

    async function send(customer: CustomerModel) {
        try {
            const response = await jwtAxios.post<CustomerModel>(globals.urls.register, customer);
            const addedCustomer = response.data;
            store.dispatch(customerAddedAction(addedCustomer));
            notify.success("You are been successfully registered!");
            history.push("/customer");
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />

            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

                <div className={classes.paper}>

                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Register
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
                                pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(?: \.[a-zA-Z0-9-]+)*$/, message: "Email is not valid." }
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

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            Register
                        </Button>

                        <Box mt={5}>
                            <Copyright />
                        </Box>

                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default Register;

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://my-portfolio-site-frontend.herokuapp.com" target="_blank">
                Click Here To See My Personal Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${registerImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '(100vh - 40px)',
        width: 400,
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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));