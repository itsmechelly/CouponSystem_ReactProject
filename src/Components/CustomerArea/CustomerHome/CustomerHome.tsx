import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { ClientType } from "../../../Models/UserModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import PurchaseCard from "../PurchaseCard/PurchaseCard";
import "./CustomerHome.css";

function CustomerHome(): JSX.Element {

    let history = useHistory();
    let [coupons, setCoupons] = useState<CouponModel[]>(null);

    useEffect(() => {
        if (store.getState().AuthState.user?.clientType !== ClientType.CUSTOMER) {
            notify.error("Please log in");
            history.push("/login");
        }
        getCoupons();
    }, []);

    async function getCoupons() {
        try {
            let response = await jwtAxios.get<CouponModel[]>(globals.urls.getAllAvailableForPurchase);
            setCoupons(response.data);
        } catch (error) {
            notify.error(error);
        }
    }

    return (
        <div className="CustomerHome">
            <div className="MainHeader">
                <h1>All Available To Purchase Coupons:</h1>
                <p>Some text about who we are and what we do.</p>
                <p>Resize the browser window to see that this page is responsive by the way.</p>
            </div>

            <div className="w3-container">
                <h1>Our Coupon System</h1>
                <h2>Join us for the best shopping experience you can ever find, <br />and you will get the top products available on the market today.</h2>
                <p>We are here to help you make educated purchases with the best coupons and the biggest discounts.</p>
                <p>We are committed to providing you the best deals online.</p>
                <p>Hurry up, before all the wonderful coupons will run out!</p>
                <br />

                {coupons &&
                    <>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                            {coupons.map(coupon => (<PurchaseCard key={coupon.id} coupon={coupon} />))}
                        </div>
                        <br />
                    </>
                }
            </div>
        </div>
    );
}

export default CustomerHome;
