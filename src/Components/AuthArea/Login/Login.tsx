import { IconButton, InputAdornment, MenuItem, Select } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CredentialsModel from "../../../Models/CredentialsModel";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import loginImage from "../../../Assets/Images/Login.jpg";
import CssBaseline from '@material-ui/core/CssBaseline';
import { loginAction } from "../../../Redux/AuthState";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import notify from "../../../Services/Notification";
import TextField from '@material-ui/core/TextField';
import UserModel from "../../../Models/UserModel";
import Checkbox from '@material-ui/core/Checkbox';
import globals from "../../../Services/Globals";
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useForm } from "react-hook-form";
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import store from "../../../Redux/Store";
import Box from '@material-ui/core/Box';
import axios from "axios";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";

interface LoginState {
    showPassword: boolean;
}

function Login(): JSX.Element {

    let { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>({ mode: "all" });
    const [state, setState] = useState<LoginState>({ showPassword: false });
    const classes = useStyles();
    const history = useHistory();

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };

    async function send(credentials: CredentialsModel) {
        try {
            const response = await axios.post<UserModel>(globals.urls.login, credentials);
            store.dispatch(loginAction(response.data));
            notify.success("You have been successfully logged in!");
            if (response.data.clientType === "ADMIN") {
                history.push("/admin");
            } else if (response.data.clientType === "COMPANY") {
                history.push("/company");
            } else if (response.data.clientType === "CUSTOMER") {
                history.push("/customer");
            }
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <h1>hiush (: ani po </h1>
        </Grid>
    );
}

export default Login;

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
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
        backgroundImage: `url(${loginImage})`,
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
        width: '90%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));