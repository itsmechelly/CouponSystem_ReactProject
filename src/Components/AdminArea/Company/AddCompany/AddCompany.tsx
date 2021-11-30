import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';

import { useState } from "react";
import { useForm } from "react-hook-form";
import CompanyModel from "../../../../Models/CompanyModel";
import "./AddCompany.css";

interface AddCompanyState {
    showPassword: boolean;
}

function AddCompany(): JSX.Element {

    let { register, formState: { errors } } = useForm<CompanyModel>({ mode: "all" });
    const [state, setState] = useState<AddCompanyState>({ showPassword: false });

    const classes = useStyles();

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };

    return (
        <div className="AddCompany">

            <h1>BH</h1>

            <form>

                <TextField
                    label="Company Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    autoFocus
                    inputProps={{ pattern: "/^[a-zA-Z0-9]+$/gi", minLength: 4, }}
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
                    inputProps={{ pattern: "/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/", }}
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
                    inputProps={{ pattern: "/^[a-zA-Z0-9]+$/gi", minLength: 4, }}
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

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sign In
                    </Button>
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sign Out
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
    },
}));