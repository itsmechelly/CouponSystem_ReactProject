import { Grid, CssBaseline, Paper, Avatar, Typography, TextField, Select, MenuItem, FormControlLabel, Checkbox, Button, Box, makeStyles } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import registerImage from "../../../Assets/Images/Login.jpg";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { registerAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import "./Register.css";

function Register(): JSX.Element {

    const classes = useStyles();
    const history = useHistory(); //Redirect function
    const { register, handleSubmit } = useForm<UserModel>();

    async function send(user: UserModel) {
        try {
            const response = await axios.post<UserModel>(globals.urls.register, user);
            store.dispatch(registerAction(response.data));
            notify.success("You are been successfully registered!");
            history.push("/layout"); //Redirect to home on success
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

                    <form onSubmit={handleSubmit(send)} className={classes.form} noValidate>

                        <TextField
                            label="First Name"
                            name="firstName"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            // autoFocus
                            required
                            {...register("clientName")}
                        />

                        <TextField
                            label="Last Name"
                            // name="lastName"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                        // {...register("lastName")}
                        />

                        <TextField
                            label="Email Address"
                            autoComplete="email"
                            name="email"
                            // id="email"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            // autoFocus
                            required
                            {...register("email")}
                        />

                        <TextField
                            label="Password"
                            // type="password"
                            autoComplete="current-password"
                            name="password"
                            // id="password"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            {...register("password")}
                        />

                        <br />
                        <br />

                        <TextField
                            name="clientType"
                            fullWidth
                            select
                            required
                            className="mui-input"
                            label="Client type" variant="outlined"
                            defaultValue={"clientType"}
                            SelectProps={{ native: true }}
                            {...register("clientType", {
                                required: { value: true, message: "Missing client type." }
                            })}
                        //need to handle errors!
                        // error={!!errors.clientType}
                        // helperText={errors.clientType?.message}
                        >
                            <option value=""></option>
                            <option value="ADMIN">Admin</option>
                            <option value="COMPANY">Company</option>
                            <option value="CUSTOMER">Customer</option>
                        </TextField>

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
                            Click To Register
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
            <Link color="inherit" to="https://material-ui.com/">
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