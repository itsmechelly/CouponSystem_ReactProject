import { Select, MenuItem } from "@material-ui/core";
import { Component } from "react";
import CouponModel from "../../../Models/CouponModel";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import CouponsCard from "../CouponsCard/CouponsCard";
import "./GetAllCouponsByCategory.css";

interface GetCustomerCouponsByCategoryState {
    coupons: CouponModel[];
}

class GetCustomerCouponsByCategory extends Component<{}, GetCustomerCouponsByCategoryState> {
   
    public constructor(props: {}) {
        super(props);
        this.state = {
            coupons: [],
        };
    }

    public render(): JSX.Element {
        return (
            <div className="GetAllCouponsByCategory">
                <>
                    <div className="Select">

                        <h2 className="ClickMe">Click here to choose a category</h2>

                        <Select
                            required
                            variant="outlined"
                            type="select"
                            displayEmpty
                            className="SelectButton"
                            defaultValue={""}

                            onChange={async (selectItem) => {
                                try {
                                    const response = await jwtAxios.get<CouponModel[]>(
                                        globals.urls.getAllCustomerCouponsByCategory + selectItem.target.value
                                    );
                                    this.setState({ coupons: response.data });
                                } catch (err) {
                                    notify.error(err);
                                }
                            }}
                        >
                            <MenuItem value="" disabled selected>
                                Coupon Category *
                            </MenuItem>
                            <MenuItem value="FOOD">Food</MenuItem>
                            <MenuItem value="ELECTRICITY">Electricity</MenuItem>
                            <MenuItem value="RESTAURANT">Restaurant</MenuItem>
                            <MenuItem value="VACATION">Vacation</MenuItem>
                        </Select>
                    </div>

                    <div className="cardRes">
                        <ul className="CustomerMenu">
                            {this.state.coupons.map((coupon) => (
                                <CouponsCard key={coupon.id} coupon={coupon} />
                            ))}
                        </ul>
                    </div>
                </>

            </div >
        );
    }
}

export default GetCustomerCouponsByCategory;
