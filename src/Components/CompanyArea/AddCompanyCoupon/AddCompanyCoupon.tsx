import { Button, ButtonGroup, FormControl, FormHelperText, TextField, Typography } from "@material-ui/core";
import { Add, ClearAll, Send } from "@material-ui/icons";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { CategoryType } from "../../../Models/CategoryType";
import CouponModel from "../../../Models/CouponModel";
import { ClientType } from "../../../Models/UserModel";
import { couponsAddedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./AddCompanyCoupon.css";

function AddCompanyCoupon(): JSX.Element {

    return (
        <div className="AddCompanyCoupon">
            <div className="Container">

                <Add />
                <Typography variant="h3" className="Headline">
                    Add Company Coupon
                </Typography>

                {/* <form onSubmit={handleSubmit(send)}> */}
                <form>
                    <h1>BH</h1>
                </form>

            </div>
        </div >
    );
}

export default AddCompanyCoupon;