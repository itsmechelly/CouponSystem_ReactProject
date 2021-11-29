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
                <h1>hi</h1>
            </div>
        </div >
    );
}

export default AddCompany;