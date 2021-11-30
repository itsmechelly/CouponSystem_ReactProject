import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import store from '../../../../Redux/Store';
import globals from '../../../../Services/Globals';
import jwtAxios from '../../../../Services/jwtAxios';
import notify from '../../../../Services/Notification';
import CompanyModel from "../../../../Models/CompanyModel";
import { companyAddedAction } from '../../../../Redux/CompaniesState';
import "./AddCompany.css";
import { ClientType } from '../../../../Models/UserModel';
// import { AddCircleOutlined } from '@material-ui/icons';

interface AddCompanyState {
    showPassword: boolean;
}

function AddCompany(): JSX.Element {

    let { register, handleSubmit, formState: { errors } } = useForm<CompanyModel>({ mode: "all" });
    const [state, setState] = useState<AddCompanyState>({ showPassword: false });
    let history = useHistory();
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

    async function send(company: CompanyModel) {
        try {
            const response = await jwtAxios.post<CompanyModel>(globals.urls.addCompany, company);
            const addedCompany = response.data;
            store.dispatch(companyAddedAction(addedCompany));
            notify.success("Company has been added! company name: " + addedCompany.name);
            history.push("/admin/getAllCompanies");
        } catch (err) {
            notify.error(err);
            // if (err.response.data.status === 401) { // UNAUTHORIZED or Token Expired
            //     history.push("/logout");
            // }
        }
    }

    return (
        <div className="AddCompany">

            {/* <AddCircleOutlined /> */}
            <Typography variant="h3" className="Headline">
                Add Company
            </Typography>

            <form onSubmit={handleSubmit(send)}>

                <TextField
                    label="Company Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    autoFocus
                    {...register("name", {
                        required: { value: true, message: "Missing name." },
                        minLength: { value: 4, message: "Company Name is too short, should be at least 4 characters." },
                        pattern: { value: /^[a-zA-Z0-9]+$/gi, message: "Company name is not valid, only letters and numbers are permitted." }
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />

                <TextField
                    label="Company Email"
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
                    label="Company Password"
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
        </div >
    );
}

export default AddCompany;

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