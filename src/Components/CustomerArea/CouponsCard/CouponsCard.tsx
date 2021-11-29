import CouponModel from "../../../Models/CouponModel";
import "./CouponsCard.css";
import globals from "../../../Services/Globals";

interface CouponsCardProps {
    coupon: CouponModel;
}

function CouponsCard(props: CouponsCardProps): JSX.Element {
    return (
        <div className="CouponsCard">
            <div className="Row">
                <div className="Column">
                    <div className="Card">

                        <img className="CouponImg" src={props.coupon.image} alt="Coupon Image" />

                        <div className="Container">
                            <div className="DataCard">
                                <br />
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
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CouponsCard;