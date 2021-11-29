import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import CouponModel from "../../../../Models/CouponModel";
import { ClientType } from "../../../../Models/UserModel";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/Notification";
import "./AddCompany.css";

function AddCompany(): JSX.Element {

    let { register, handleSubmit, formState: { errors }, getValues } = useForm<CouponModel>({ mode: "all" });
    const history = useHistory();

    useEffect(() => {
        if (store.getState().AuthState.user?.clientType !== ClientType.COMPANY) {
            notify.error("Please log in");
            history.push("/login");
        }
    }, []);

    return (
        <div className="AddCompany">
            <div className="Container">
                <h1>hi</h1>
            </div>
        </div >
    );
}

export default AddCompany;