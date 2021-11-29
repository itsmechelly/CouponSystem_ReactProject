import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import { Add, ClearAll, Send } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import CompanyModel from "../../../../Models/CompanyModel";
import { ClientType } from "../../../../Models/UserModel";
import { companyAddedAction } from "../../../../Redux/CompaniesState";
import { couponsAddedAction } from "../../../../Redux/CouponsState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/jwtAxios";
import notify from "../../../../Services/Notification";
import "./AddCompany.css";

interface AddCompanyState {
    showPassword: boolean;
}

function AddCompany(): JSX.Element {

    let { register, handleSubmit, formState: { errors } } = useForm<CompanyModel>({ mode: "all" });
    const history = useHistory();
    const [state, setState] = useState<AddCompanyState>({ showPassword: false });

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
            <div className="Container">

                <Add />
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

export default AddCompany;