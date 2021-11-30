import "./GetAllCompanies.css";
import { useEffect, useState } from "react";
import CompaniesCard from "../CompaniesCard/CompaniesCard";
import { useHistory } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import { ClientType } from "../../../../Models/UserModel";
import { companiesDownloadedAction } from "../../../../Redux/CompaniesState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/jwtAxios";
import notify from "../../../../Services/Notification";

function GetAllCompanies(): JSX.Element {

    // let history = useHistory();
    // let [companies, setCompanies] = useState<CompanyModel[]>(store.getState().CompaniesState.companies);

    // useEffect(() => {
    //     let unSubscribeMe = store.subscribe(() => {
    //         setCompanies(store.getState().CompaniesState.companies);
    //     })
    //     if (store.getState().AuthState.user?.clientType !== ClientType.ADMIN) {
    //         notify.error("Please log in");
    //         history.push("/login");
    //     }
    //     else if (store.getState().CompaniesState.companies.length === 0) {
    //         getCompanies();
    //     }
    //     return function cleanup() {
    //         unSubscribeMe();
    //     }
    // }, []);

    // async function getCompanies() {
    //     try {
    //         let response = await jwtAxios.get<CompanyModel[]>(globals.urls.getAllCompanies);
    //         store.dispatch(companiesDownloadedAction(response.data));
    //     } catch (error) {
    //         notify.error(error);
    //     }
    // }

    let history = useHistory();
    let [companies, setCompanies] = useState<CompanyModel[]>(null);

    useEffect(() => {
        if (store.getState().AuthState.user?.clientType !== ClientType.ADMIN) {
            notify.error("Please log in");
            history.push("/login");
        }
        getCompanies();
    }, []);

    async function getCompanies() {
        try {
            let response = await jwtAxios.get<CompanyModel[]>(globals.urls.getAllCompanies);
            setCompanies(response.data);
        } catch (error) {
            notify.error(error);
        }
    }

    return (
        <div className="GetAllCompanies">

            <div className="MainHeader">
                <h1>Get All Customer Coupons</h1>
                <p>Some text about who we are and what we do.</p>
                <p>Resize the browser window to see that this page is responsive by the way.</p>
            </div>

            <h1 className="BigTitle">ALL COMPANIES!!!</h1>

            {companies?.length > 0 &&
                <>
                    {/* <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}> */}
                    <div className="CompaniesStyle">
                        {companies?.map(company => <CompaniesCard key={company.id} company={company} />)}
                    </div>
                    <br />
                </>
            }

        </div>
    );
}

export default GetAllCompanies;
