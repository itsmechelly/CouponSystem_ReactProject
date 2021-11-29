import "./CouponsCard.css";
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { couponDeletedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";

interface CouponsCardProps {
    coupon: CouponModel;
}

function CouponsCard(props: CouponsCardProps): JSX.Element {

    let history = useHistory();
    let { handleSubmit } = useForm<CouponModel>();

    async function handleDelete(coupon: CouponModel) {
        try {
            const item = "Going to delete coupon, are you sure? (change needed here -> YES NO dialog!!!)";
            alert(item);

            let response = await jwtAxios.delete<number>(globals.urls.deleteCompanyCoupon + props.coupon.id);
            store.dispatch(couponDeletedAction(response.data));
            notify.success("" + response.data);
            history.push("/company/getAllCompaniesCoupons");
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
                                <p className="Category">{props.coupon.category}</p>
                                <p className="Price">{props.coupon.price}$</p>
                                <br />
                                <br />
                                <p>{props.coupon.title}</p>
                                <p>{props.coupon.category}</p>
                                <p>{props.coupon.description}</p>
                                <br />
                                <p>Start Date: {props.coupon.startDate}</p>
                                <p>End Date: {props.coupon.endDate}</p>
                                <p>Amount in Stock: {props.coupon.amount}</p>
                                <br />
                            </div>
                            <button className="Button"><NavLink to={"/company/updateCompanyCoupon/" + props.coupon.id}>Update </NavLink>Coupon</button>
                            <button className="Button" onClick={handleSubmit(handleDelete)}>Delete Coupon</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CouponsCard;
