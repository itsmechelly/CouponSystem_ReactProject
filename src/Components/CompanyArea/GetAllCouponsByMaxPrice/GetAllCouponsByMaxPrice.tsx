import { TextField, Button } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CouponModel from "../../../Models/CouponModel";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import CouponsCard from "../CouponsCard/CouponsCard";
import "./GetAllCouponsByMaxPrice.css";

interface enteredPrice {
    maxPrice: number;
}

function GetAllCouponsByMaxPrice(): JSX.Element {

    const [coupons, setCoupons] = useState<Array<CouponModel>>([]);
    const { register, handleSubmit } = useForm<enteredPrice>();

    async function send(price: enteredPrice) {
        try {
            const response = await jwtAxios.get<CouponModel[]>(
                globals.urls.getAllCompanyCouponsUnderMaxPrice + price.maxPrice
            );
            setCoupons(response.data);
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="GetAllCouponsByMaxPrice">
            <>
                <div className="TextField">

                    <h2 className="ClickMe">Click here to set price value</h2>

                    <form className="TextFieldForm" onSubmit={handleSubmit(send)}>
                        <TextField
                            {...register("maxPrice")}
                            label="Maximum Price"
                            variant="outlined"
                            type="numeric"
                        />
                        <br />
                        <br />
                        <Button style={{ padding: "15.5px 77px" }} className="TextFieldButton" type="submit" variant="outlined">send</Button>
                    </form>
                </div>

                <div className="MaxCard">
                    <ul className="MaxCardUl">
                        {coupons.map((c) => (
                            <CouponsCard key={c.id} coupon={c} />
                        ))}
                    </ul>
                </div>
            </>

        </div>
    );
}

export default GetAllCouponsByMaxPrice;
