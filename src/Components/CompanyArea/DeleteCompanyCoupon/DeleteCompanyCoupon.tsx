import { Typography, TextField, ButtonGroup, Button } from "@material-ui/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { ClientType } from "../../../Models/UserModel";
import { couponDeletedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./DeleteCompanyCoupon.css";

function DeleteCompanyCoupon(): JSX.Element {

    let history = useHistory();
    let { register, handleSubmit } = useForm<CouponModel>();

    useEffect(() => {
        if (store.getState().AuthState.user?.clientType !== ClientType.COMPANY) {
            notify.error("Please log in");
            history.push("/login");
        } else {
        }
    }, []);

    async function handleDelete(coupon: CouponModel) {
        try {
            let response = await jwtAxios.delete<number>(globals.urls.deleteCompanyCoupon + coupon.id);
            store.dispatch(couponDeletedAction(response.data));
            notify.success("" + response.data);
            history.push("/company/getAllCompaniesCoupons");
        } catch (error) {
            notify.error(error);
        }
    }

    return (
        <div className="DeleteCompanyCoupon">
            <div className="Container">

                <Typography variant="h3" className="Headline">
                    Delete Company Coupon
                </Typography>

                <form onSubmit={handleSubmit(handleDelete)}>

                    <TextField
                        label="Coupon Id"
                        type="text"
                        name="id"
                        variant="outlined"
                        margin="normal"
                        // autoFocus
                        required
                        {...register("id")}
                    />

                    <ButtonGroup className="Group" variant="text" fullWidth>
                        <Button className="A" type="submit" color="primary" variant="contained">
                            Confirm
                        </Button>
                        <Button className="B" type="reset" color="secondary" variant="contained">
                            Reset
                        </Button>
                    </ButtonGroup>

                </form>

            </div>
        </div>
    );
}

export default DeleteCompanyCoupon;
