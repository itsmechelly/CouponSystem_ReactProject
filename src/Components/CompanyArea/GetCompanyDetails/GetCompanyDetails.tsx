import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import { ClientType } from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./GetCompanyDetails.css";

function GetCompanyDetails(): JSX.Element {

    const history = useHistory();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        if (store.getState().AuthState.user?.clientType !== ClientType.COMPANY) {
            notify.error("Please log in");
            history.push("/login");
        }
        getCompanyDetails();
    }, []);

    async function getCompanyDetails() {
        try {
            let response = await jwtAxios.get<CompanyModel>(globals.urls.getCompanyDetails);
            // store.dispatch(couponsDownloadedAction(response.data));
            const companySent = response.data;
            setCompany(companySent);
        } catch (error) {
            notify.error(error);
        }
    }

    return (
        <div className="GetCompanyDetails">

            <div className="Container">
                <div className="TextField">

                    {company != null && (
                        <>
                            <br />
                            <p className="CompanyName">{company.name}</p>
                            <p>Company Name: {company.name}</p>
                            <p className="DetailsInMin">Email: {company.email}</p>
                            <p className="DetailsInMin">Password: {company.password}</p>
                            <br />
                        </>
                    )}
                </div>
            </div>

        </div>
    );
}

export default GetCompanyDetails;
