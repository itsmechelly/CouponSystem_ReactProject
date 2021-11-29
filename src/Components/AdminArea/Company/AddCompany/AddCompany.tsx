import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import CouponModel from "../../../../Models/CouponModel";
import "./AddCompany.css";

function AddCompany(): JSX.Element {

    let { register, handleSubmit, formState: { errors }, getValues } = useForm<CouponModel>({ mode: "all" });
    const history = useHistory();

    return (
        <div className="AddCompany">
            <div className="Container">
                <h1>hi</h1>
            </div>
        </div >
    );
}

export default AddCompany;