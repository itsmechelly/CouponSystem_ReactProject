import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import CouponModel from "../../../../Models/CouponModel";
import { ClientType } from "../../../../Models/UserModel";
import { couponsAddedAction } from "../../../../Redux/CouponsState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/jwtAxios";
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

    async function send(coupon: CouponModel) {
        const myFormData = new FormData();
        myFormData.append("title", coupon.title);
        myFormData.append("category", coupon.category);
        myFormData.append("price", coupon.price.toString());
        myFormData.append("amount", coupon.amount.toString());
        myFormData.append("startDate", coupon.startDate.toString());
        myFormData.append("endDate", coupon.endDate.toString());
        myFormData.append("description", coupon.description);
        myFormData.append("imageFile", coupon.imageFile.item(0));

        try {
            const response = await jwtAxios.post<CouponModel>(globals.urls.addCompanyCoupon, myFormData);
            const addedCoupon = response.data;
            store.dispatch(couponsAddedAction(addedCoupon));
            notify.success("Coupon has been added! coupon name: " + addedCoupon.title);
            history.push("/company/getAllCompaniesCoupons");
        } catch (err) {
            notify.error(err);
            // if (err.response.data.status === 401) {
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