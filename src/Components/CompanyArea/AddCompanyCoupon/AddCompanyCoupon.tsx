import { Button, ButtonGroup, createStyles, FormControl, FormHelperText, makeStyles, MenuItem, OutlinedInput, Select, TextField, Theme, Typography, withWidth } from "@material-ui/core";
import { couponsAddedAction } from "../../../Redux/CouponsState";
import { Add, ClearAll, Send } from "@material-ui/icons";
import { ClientType } from "../../../Models/UserModel";
import CouponModel from "../../../Models/CouponModel";
import notify from "../../../Services/Notification";
import jwtAxios from "../../../Services/jwtAxios";
import globals from "../../../Services/Globals";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import store from "../../../Redux/Store";
import { useEffect, useState } from "react";
import "./AddCompanyCoupon.css";
import { CategoryType } from "../../../Models/CategoryType";

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         container: {
//             display: 'flex',
//             flexWrap: 'wrap',
//         },
//         textField: {
//             maxWidth: 250
//         },
//         input: {
//             backgroundColor: '#ffffff',
//         }
//     }),
// );

function AddCompanyCoupon(): JSX.Element {

    let { register, handleSubmit, formState: { errors }, getValues } = useForm<CouponModel>({ mode: "all" });
    const history = useHistory();
    // const classes = useStyles();

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
        <div className="AddCompanyCoupon">
            <div className="Container">

                <Add />
                <Typography variant="h3" className="Headline">
                    Add Company Coupon
                </Typography>

            </div>
        </div >
    );
}

export default AddCompanyCoupon;