import { Button, ButtonGroup, IconButton, InputAdornment, MenuItem, Select, TextField } from "@material-ui/core";
import { ClearAll, Edit, Send, Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import { ClientType } from "../../../../Models/UserModel";
import { companyUpdatedAction } from "../../../../Redux/CompaniesState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/jwtAxios";
import notify from "../../../../Services/Notification";
import "./UpdateCompany.css";

interface AddCustomerState {
    showPassword: boolean;
}

function UpdateCompany(): JSX.Element {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<CompanyModel>({ mode: "all" });
    const history = useHistory();
    const [state, setState] = useState<AddCustomerState>({ showPassword: false });
    const classes = useStyles();

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };

    const { id } = useParams<{ id: string }>();
    const [company] = useState(store.getState().CompaniesState.companies.find(c => c.id === +id));
    const companyInitial = { ...company };

    // const [company, setCompanyState] = useState<CompanyModel>();
    // setCompanyState(store.getState().CompaniesState.companies.find(c => c.id === parseInt(id)));

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        switch (name) {
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
            if (company) {
                setValue("id", company.id);
                setValue("name", company.name);
                setValue("email", company.email);
                setValue("password", company.password);
            }
        } catch (err) {
            notify.error(err);
        }
    }, [company, setValue]);

    async function send(company: CompanyModel) {
        if (!isCompanyDifferent(companyInitial, company)) {
            notify.error("No changes were made!");
            return;
        }
        try {
            const response = await jwtAxios.put<CompanyModel>(globals.urls.updateCompany, company);
            store.dispatch(companyUpdatedAction(response.data));
            notify.success("Company has been updated!");
            history.push("/admin/getAllCompanies");
        } catch (err) {
            notify.error(err);
            // if (err.response.data.status === 401) {
            //     history.push("/logout");
            // }
        }
    }

    function isCompanyDifferent(companyBefore: CompanyModel, company: CompanyModel) {
        let isDiff: boolean = false;

        Object.entries(company).forEach(afterEntry => {
            if (isDiff) return;
            const beforeEntry = Object.entries(companyBefore).find(bEntry => afterEntry[0] === bEntry[0])
            if (!(afterEntry.toString() === beforeEntry.toString())) {
                isDiff = true;
            }
        });
        return isDiff;
    }

    return (

        <div className="UpdateCompany">
            <div className="Container">

                {/* <Edit /> */}
                <Typography variant="h3" className="Headline">
                    Update Company
                </Typography>

                <form onSubmit={handleSubmit(send)}>

                    <TextField
                        label="Company Name"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        {...register("name")}
                        defaultValue={company?.name}
                        disabled
                    />

                    <TextField
                        label="Company Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        autoFocus
                        type="email"
                        autoComplete="email"
                        // inputProps={{ pattern: "/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/", }}
                        {...register("email", {
                            required: { value: true, message: "Missing email." },
                            pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: "Email is not valid." }
                        })}
                        defaultValue={company?.email}
                        inputProps={{ onChange: handleChange }}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        label="Company Password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        autoComplete="current-password"
                        // inputProps={{ pattern: "/^[a-zA-Z0-9]+$/gi", minLength: 4, }}
                        {...register("password", {
                            required: { value: true, message: "Missing password." },
                            minLength: { value: 4, message: "Password too short, should be at least 4 characters." },
                            pattern: { value: /^[a-zA-Z0-9]+$/gi, message: "Password is not valid, only letters and numbers are permitted." }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        type={state.showPassword ? 'text' : 'password'}
                        defaultValue={company?.password}
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
                    />

                    <ButtonGroup>
                        {/* <ButtonGroup variant="text"> */}

                        <Button
                            // startIcon={<Send />}
                            type="submit"
                            color="primary"
                            variant="contained"
                            className={classes.submit}>
                            Confirm
                        </Button>

                        <Button
                            // startIcon={<ClearAll />}
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

export default UpdateCompany;

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