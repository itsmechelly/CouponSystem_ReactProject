import happy from "../../../../Assets/Images/Happy.jpg";
import "./CompaniesCard.css";
import { NavLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import CompanyModel from "../../../../Models/CompanyModel";
import { companyDeletedAction } from "../../../../Redux/CompaniesState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/jwtAxios";
import notify from "../../../../Services/Notification";

interface CompaniesCardProps {
    company: CompanyModel;
}

function CompaniesCard(props: CompaniesCardProps): JSX.Element {

    let history = useHistory();
    let { handleSubmit } = useForm<CompanyModel>();

    async function handleDelete(company: CompanyModel) {
        try {
            const item = "Going to delete, sure? (change needed here!!!)";
            alert(item);

            let response = await jwtAxios.delete<number>(globals.urls.deleteCompany + props.company.id);
            store.dispatch(companyDeletedAction(response.data));
            notify.success("" + response.data);
            history.push("/admin/getAllCompanies");
        } catch (error) {
            notify.error(error);
        }
    }

    return (
        <div className="CompaniesCard">
            <div className="Row">
                <div className="Column">
                    <div className="Card">

                        <img className="CompanyImg" src={happy} alt="Company Happy" />

                        <div className="Container">
                            <div className="CardData">
                                <h2>{props.company.name}</h2>
                                <p className="CompanyId">Company Id Number: {props.company.id}</p>
                                <p>{props.company.name}</p>
                                <p>{props.company.email}</p>
                                <p>{props.company.password}</p>
                            </div>
                            <button className="Button"><NavLink to={"/admin/getOneCompany/" + props.company.id}>Get One </NavLink> Company</button>
                            <button className="Button"><NavLink to={"/admin/updateCompany/" + props.company.id}>Update </NavLink>Company</button>
                            <button className="Button" onClick={handleSubmit(handleDelete)}>Delete Company</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompaniesCard;