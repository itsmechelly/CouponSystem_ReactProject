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
import "./GetAllCompaniesCoupons.css";

function GetAllCompaniesCoupons(): JSX.Element {

    let history = useHistory();
    let [coupons, setCoupons] = useState<CouponModel[]>(store.getState().CouponsState.coupons);

    useEffect(() => {
        let unSubscribeMe = store.subscribe(() => {
            setCoupons(store.getState().CouponsState.coupons);
        })
        if (store.getState().AuthState.user?.clientType !== ClientType.COMPANY) {
            notify.error("Please log in");
            history.push("/login");
        }
        else if (store.getState().CustomersState.customers.length === 0) {
            getCoupons();
        }
        return function cleanup() {
            unSubscribeMe();
        }
    }, []);

    async function getCoupons() {
        try {
            let response = await jwtAxios.get<CouponModel[]>(globals.urls.getAllCompaniesCoupons);
            store.dispatch(couponsDownloadedAction(response.data));
        } catch (error) {
            notify.error(error);
        }
    }

    return (
        <div className="GetAllCompaniesCoupons">

            <div className="MainHeader">
                <h1>Get All Companies Coupons</h1>
                <p>Some text about who we are and what we do.</p>
                <p>Resize the browser window to see that this page is responsive by the way.</p>
            </div>

            <TotalCoupons />
            <h1 className="BigTitle">ALL COUPONS!!!</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                {coupons.map(coupon => (<CouponsCard key={coupon.id} coupon={coupon} />))}
            </div>

            <TotalCoupons />

        </div>
    );
}

export default GetAllCompaniesCoupons;
