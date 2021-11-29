import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import { ClientType } from "../../../../Models/UserModel";
import { companyDeletedAction } from "../../../../Redux/CompaniesState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/jwtAxios";
import notify from "../../../../Services/Notification";
import "./DeleteCompany.css";

function DeleteCompany(): JSX.Element {

    let history = useHistory();
    let { register, handleSubmit } = useForm<CompanyModel>();

    useEffect(() => {
        if (store.getState().AuthState.user?.clientType !== ClientType.ADMIN) {
            notify.error("Please log in");
            history.push("/login");
        } else {
        }
    }, []);

    async function handleDelete(company: CompanyModel) {
        try {
            let response = await jwtAxios.delete<number>(globals.urls.deleteCompany + company.id);
            store.dispatch(companyDeletedAction(response.data));
            notify.success("" + response.data);
            history.push("/admin/getAllCompanies");
        } catch (error) {
            notify.error(error);
        }
    }

    return (
        <div className="DeleteCompany">
            <div className="Container">

                <Typography variant="h3" className="Headline">
                    Delete Company
                </Typography>

                <form onSubmit={handleSubmit(handleDelete)}>

                    <TextField
                        label="Company Id"
                        type="text"
                        name="id"
                        variant="outlined"
                        margin="normal"
                        // autoFocus
                        required
                        {...register("id")}
                    />

                    <ButtonGroup className="Group" variant="text" fullWidth>
                        <Button className="A" type="submit" color="primary" variant="contained">
                            Confirm
                        </Button>
                        <Button className="B" type="reset" color="secondary" variant="contained">
                            Reset
                        </Button>
                    </ButtonGroup>

                </form>

            </div>
        </div>
    );
}

export default DeleteCompany;
