import CouponModel from "../../../Models/CouponModel";
import "./PurchaseCard.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { couponsAddedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";

interface PurchaseCardProps {
    coupon: CouponModel;
}

function PurchaseCard(props: PurchaseCardProps): JSX.Element {

    let history = useHistory();
    let { handleSubmit } = useForm<CouponModel>();

    async function handlePurchase(coupon: CouponModel) {
        try {

            let response = await jwtAxios.post<CouponModel>(globals.urls.purchaseCoupon + "/" + props.coupon.id);
            store.dispatch(couponsAddedAction(props.coupon));

            const item = "Going to add new coupon purchase... (should be changed to YES NO dialog (:";
            alert(item);
            console.log("" + response.data);
            console.log("" + props.coupon);
            notify.success("" + response.data);
            notify.success("" + props.coupon);
            history.push("/customer/getAllCustomerCoupons");
        } catch (error) {
            notify.error(error);
        }
    }

    return (
        <div className="CouponsCard">
            <div className="Row">
                <div className="Column">
                    <div className="Card">

                        <img className="CouponImg" src={props.coupon.image} alt="Coupon Image" />

                        <div className="Container">
                            <div className="CardData">
                                <h1>{props.coupon.title}</h1>
                                <p className="Price">${props.coupon.price}</p>
                                <p className="Category">{props.coupon.category}</p>
                                <p>title {props.coupon.title}</p>
                                <p>id {props.coupon.id}</p>
                                <p>companyId {props.coupon.companyId}</p>
                                <p>description {props.coupon.description}</p>
                                <p>amount {props.coupon.amount}</p>
                                <p>startDate {props.coupon.startDate}</p>
                                <p>endDate {props.coupon.endDate}</p>
                            </div>
                            <button className="Button" onClick={handleSubmit(handlePurchase)}>Purchase Customer</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PurchaseCard;