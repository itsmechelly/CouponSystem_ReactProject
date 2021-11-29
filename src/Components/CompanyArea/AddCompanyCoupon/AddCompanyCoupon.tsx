import { Button, ButtonGroup, FormControl, FormHelperText, TextField, Typography } from "@material-ui/core";
import { couponsAddedAction } from "../../../Redux/CouponsState";
import { Add, ClearAll, Send } from "@material-ui/icons";
import { ClientType } from "../../../Models/UserModel";
import CouponModel from "../../../Models/CouponModel";
import notify from "../../../Services/Notification";
import jwtAxios from "../../../Services/jwtAxios";
import globals from "../../../Services/Globals";
import { useForm } from "react-hook-form";
import store from "../../../Redux/Store";
import { useEffect } from "react";
import "./AddCompanyCoupon.css";
import { CategoryType } from "../../../Models/CategoryType";
import { useHistory } from "react-router-dom";


function AddCompanyCoupon(): JSX.Element {

    let { register, handleSubmit, formState: { errors }, getValues } = useForm<CouponModel>({ mode: "all" });
    const history = useHistory();

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

                <form onSubmit={handleSubmit(send)}>

                    <TextField
                        label="Coupon Title"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="text"
                        autoFocus
                        inputProps={{ pattern: "/^[a-zA-Z0-9]+$/gi", minLength: 2, }}
                        {...register("title", {
                            required: { value: true, message: "Missing title." },
                            minLength: { value: 2, message: "Title is too short, should be at least 2 characters." },
                            pattern: { value: /^[a-zA-Z0-9]+$/gi, message: "Title is not valid, only letters and numbers are permitted." }
                        })}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <br />

                    <TextField
                        label="Coupon Category"
                        variant="outlined"
                        margin="normal"
                        name="category"
                        select
                        fullWidth
                        inputProps={{ pattern: "/^((?!CategoryList).)*$/", }}
                        {...register("category", {
                            required: { value: true, message: "Missing category." },
                            pattern: { value: /^((?!CategoryList).)*$/, message: "Not selected, please choose one category." }
                        })}
                        SelectProps={{ native: true }}
                        error={!!errors.category}
                        helperText={errors.category?.message}
                    >
                        <option value="CategoryList">Choose Category</option>
                        {Object.values(CategoryType).map(val =>
                            <option value={val}>{val.toString().charAt(0).toLocaleUpperCase().concat(val.substring(1).toLocaleLowerCase())}</option>
                        )}
                    </TextField>
                    <br />

                    <TextField
                        label="Coupon Price"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="number"
                        inputProps={{
                            step: 0.01,
                            min: 0.01,
                            pattern: "/^[+]?([0-9]+(?:[.][0-9]*)?|.[0-9]+)$/",
                        }}
                        {...register("price", {
                            required: { value: true, message: "Missing price." },
                            min: { value: 0.01, message: "Price must be above value 0.01." },
                            pattern: { value: /^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/, message: "Price is not valid, only positive and decimal numbers are permitted." }
                        })}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                    <br />

                    <TextField
                        label="Coupon Amount"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="number"
                        inputProps={{
                            min: 1,
                            pattern: "/^[0-9]+$/gi",
                        }}
                        {...register("amount", {
                            required: { value: true, message: "Missing amount." },
                            min: { value: 1, message: "Amount must be above value 1." },
                            pattern: { value: /^[0-9]+$/gi, message: "Amount is not valid, only numbers are permitted." }
                        })}
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                    />
                    <br />

                    <TextField
                        label="Coupon Start Date"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="date"
                        {...register("startDate", {
                            required: { value: true, message: "Missing start date." },
                            validate: {
                                compareToEndDate: (value) => {
                                    const { endDate } = getValues();
                                    if (!endDate) { return true };
                                    return Date.parse(value.toString()) <= Date.parse(endDate.toString()) || "Start date must be before end date.";
                                }
                            }
                        })}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.startDate}
                        helperText={errors.startDate?.message}
                    />

                    <TextField
                        label="Coupon Expiration Date"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="date"
                        {...register("endDate", {
                            required: { value: true, message: "Missing end date." },
                            validate: {
                                compareToStartDate: (value) => {
                                    const { startDate } = getValues();
                                    if (!startDate) { return true };
                                    return Date.parse(startDate.toString()) <= Date.parse(value.toString()) || "End date must be after start date";
                                }
                            }
                        })}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.endDate}
                        helperText={errors.endDate?.message}
                    />
                    <br />

                    <TextField
                        label="Coupon Description"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="text"
                        multiline
                        rows="3"
                        inputProps={{ minLength: 10, }}
                        {...register("description", {
                            required: { value: true, message: "Missing description." },
                            minLength: { value: 10, message: "Description is too short, should be at least 10 characters." }
                        })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                    <br />
                    <br />

                    <FormControl variant="outlined" fullWidth>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            style={{
                                backgroundColor: 'transparent'
                            }}
                            {...register("imageFile", {
                                required: { value: true, message: "Missing Coupon image." }
                            })}
                        />
                        <FormHelperText>{errors.imageFile?.message}</FormHelperText>
                    </FormControl>
                    <br />
                    <br />

                    <ButtonGroup className="Group" variant="text" fullWidth>

                        <Button
                            className="A"
                            startIcon={<Send />}
                            type="submit"
                            color="primary"
                            variant="contained">
                            Confirm
                        </Button>

                        <Button
                            className="B"
                            startIcon={<ClearAll />}
                            type="reset"
                            color="secondary"
                            variant="contained">
                            Reset
                        </Button>

                    </ButtonGroup>

                </form>
            </div>
        </div >
    );
}

export default AddCompanyCoupon;