import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { ClientType } from "../../../Models/UserModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import CouponsCard from "../CouponsCard/CouponsCard";
import TotalCoupons from "../TotalCoupons/TotalCoupons";
import "./GetAllCustomerCoupons.css";

function GetAllCustomerCoupons(): JSX.Element {

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
            let response = await jwtAxios.get<CouponModel[]>(globals.urls.getAllCustomerCoupons);
            setCoupons(response.data);
        } catch (error) {
            notify.error(error);
        }
    }

    return (
        <div className="GetAllCustomerCoupons">

            <div className="MainHeader">
                <h1>Get All Customer Coupons</h1>
                <p>Some text about who we are and what we do.</p>
                <p>Resize the browser window to see that this page is responsive by the way.</p>
            </div>

            <h1 className="BigTitle">ALL COUPONS!!!</h1>

            {coupons &&
                <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                        {coupons.map(coupon => (<CouponsCard key={coupon.id} coupon={coupon} />))}
                    </div>
                    <br />
                </>
            }

        </div>
    );
}

export default GetAllCustomerCoupons;