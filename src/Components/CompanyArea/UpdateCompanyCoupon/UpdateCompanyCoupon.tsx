import { createStyles, Button, ButtonGroup, FormControl, FormHelperText, makeStyles, TextField, Theme, Typography, InputAdornment } from "@material-ui/core";
import { ClearAll, Edit, Send } from "@material-ui/icons";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { CategoryType } from "../../../Models/CategoryType";
import CouponModel from "../../../Models/CouponModel";
import { ClientType } from "../../../Models/UserModel";
import { couponUpdatedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./UpdateCompanyCoupon.css";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            maxWidth: 250
        },
        input: {
            backgroundColor: '#ffffff',
        }
    }),
);

function UpdateCompanyCoupon(): JSX.Element {

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<CouponModel>({ mode: "all" });
    const history = useHistory();
    const classes = useStyles();

    const { id } = useParams<{ id: string }>();
    const couponId: number = +id;

    const [coupon] = useState(store.getState().CouponsState.coupons.find(c => c.id === couponId));
    const couponInitial = { ...coupon };

    useEffect(() => {
        if (store.getState().AuthState.user?.clientType !== ClientType.COMPANY) {
            notify.error("Please log in");
            history.push("/login");
        }
        if (coupon) {
            setValue("id", couponId);
            setValue("companyId", coupon.companyId);
            setValue("title", coupon.title);
            setValue("category", coupon.category);
            setValue("price", coupon.price);
            setValue("amount", coupon.amount);
            setValue("startDate", coupon.startDate);
            setValue("endDate", coupon.endDate);
            setValue("description", coupon.description);
            setValue("image", coupon.image);
        }
    }, [coupon, couponId, setValue]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        switch (name) {
            case "title":
                setValue("title", value);
                break;
            case "category":
                setValue("category", CategoryType[value as keyof typeof CategoryType]);
                break;
            case "price":
                setValue("price", +value);
                break;
            case "amount":
                setValue("amount", +value);
                break;
            case "startDate":
                setValue("startDate", new Date(value));
                break;
            case "endDate":
                setValue("endDate", new Date(value));
                break;
            case "description":
                setValue("description", value);
                break;
        }
    }

    async function send(coupon: CouponModel) {
        if (!isCouponDifferent(couponInitial, coupon)) {
            notify.error("No changes were made!");
            return;
        }
        try {
            const myFormData = new FormData();

            myFormData.append("id", coupon.id.toString());
            myFormData.append("companyId", coupon.companyId.toString());
            myFormData.append("title", coupon.title);
            myFormData.append("category", coupon.category.toString());
            myFormData.append("price", coupon.price.toString());
            myFormData.append("amount", coupon.amount.toString());
            myFormData.append("startDate", coupon.startDate.toString());
            myFormData.append("endDate", coupon.endDate.toString());
            myFormData.append("description", coupon.description);
            myFormData.append("image", coupon.image);

            if (coupon.imageFile.length > 0) {
                myFormData.append("imageFile", coupon.imageFile.item(0));
            }

            const response = await jwtAxios.put<CouponModel>(globals.urls.updateCompanyCoupon, myFormData);
            store.dispatch(couponUpdatedAction(response.data));
            notify.success("Coupon has been updated!");
            history.push("/company/getAllCompaniesCoupons");
        } catch (err) {
            notify.error(err);
            // if (err.response?.data?.status === 401) {
            //     history.push("/logout");
            // }
        }
    }

    function isCouponDifferent(couponBefore: CouponModel, coupon: CouponModel) {
        let isDiff: boolean = false;

        Object.entries(coupon).forEach(afterEntry => {
            if (isDiff) return;
            const beforeEntry = Object.entries(couponBefore).find(bEntry => afterEntry[0] === bEntry[0])
            if (afterEntry[1] instanceof FileList) {
                if ((afterEntry[1] as FileList).length > 0) {
                    isDiff = true;
                }
            } else if (!(afterEntry.toString() === beforeEntry.toString())) {
                isDiff = true;
            }
        });
        return isDiff;
    }

    return (

        <div className="UpdateCompanyCoupon">
            <div className="Container">

                <Typography variant="h3" className="Headline"> <Edit /> Update Coupon</Typography>

                <form onSubmit={handleSubmit(send)}>

                    <TextField
                        label="Coupon Title"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        disabled
                        className={classes.textField}
                        {...register("title")}
                        // {...register("title", {
                        //     required: { value: true, message: "Missing title." },
                        //     minLength: { value: 4, message: "Title is too short, should be at least 4 characters." },
                        //     pattern: { value: /^[a-zA-Z0-9]+$/g, message: "Title is not valid, only letters and numbers are permitted." }
                        // })}
                        InputProps={{ className: classes.input }}
                        inputProps={{ onChange: handleChange }}
                        defaultValue={coupon?.title}
                    // error={!!errors.title}
                    // helperText={errors.title?.message}
                    />
                    <br />

                    <TextField
                        label="Coupon Category"
                        variant="outlined"
                        margin="normal"
                        name="category"
                        select
                        className={classes.textField}
                        {...register("category", {
                            required: { value: true, message: "Missing category." },
                            pattern: { value: /^((?!CategoryList).)*$/, message: "Not selected, please choose one category." }
                        })}
                        SelectProps={{ native: true }}
                        InputProps={{ className: classes.input }}
                        inputProps={{ onChange: handleChange }}
                        defaultValue={coupon?.category}
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
                        type="number"
                        className={classes.textField}
                        {...register("price", {
                            required: { value: true, message: "Missing price." },
                            min: { value: 0.01, message: "Price must be above value 0.01." },
                            pattern: { value: /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/, message: "Price is not valid, only positive and decimal numbers are permitted." }
                        })}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ className: classes.input }}
                        inputProps={{
                            step: 0.01,
                            min: 0,
                            startadornment: <InputAdornment position="start">$</InputAdornment>,
                            onChange: handleChange
                        }}
                        defaultValue={coupon?.price}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                    <br />

                    <TextField
                        label="Coupon Amount"
                        variant="outlined"
                        margin="normal"
                        type="number"
                        className={classes.textField}
                        {...register("amount", {
                            required: { value: true, message: "Missing amount." },
                            min: { value: 1, message: "Amount must be above value 1." },
                            pattern: { value: /^[0-9]+$/gi, message: "Amount is not valid, only numbers are permitted." }
                        })}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ className: classes.input }}
                        inputProps={{ onChange: handleChange }}
                        defaultValue={coupon?.amount}
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                    />
                    <br />

                    <TextField
                        label="Coupon Start Date"
                        variant="outlined"
                        margin="normal"
                        type="date"
                        className={classes.textField}
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
                        InputProps={{ className: classes.input }}
                        inputProps={{ onChange: handleChange }}
                        defaultValue={coupon?.startDate}
                        error={!!errors.startDate}
                        helperText={errors.startDate?.message}
                    />
                    &nbsp;
                    &nbsp;

                    <TextField
                        label="Coupon End Date"
                        variant="outlined"
                        margin="normal"
                        type="date"
                        className={classes.textField}
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
                        InputProps={{ className: classes.input }}
                        inputProps={{ onChange: handleChange }}
                        defaultValue={coupon?.endDate}
                        error={!!errors.endDate}
                        helperText={errors.endDate?.message}
                    />
                    <br />

                    <TextField
                        label="Coupon Description"
                        variant="outlined"
                        margin="normal"
                        type="textarea"
                        rows="3"
                        rowsMax={4}
                        multiline
                        className={classes.textField}
                        {...register("description", {
                            required: { value: true, message: "Missing description." },
                            minLength: { value: 10, message: "Description is too short, should be at least 10 characters." }
                        })}
                        InputProps={{ className: classes.input }}
                        inputProps={{ onChange: handleChange }}
                        defaultValue={coupon?.description}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                    <br />
                    <br />

                    <FormControl
                        variant="outlined"
                        className={classes.textField}
                    >
                        <input
                            name="image"
                            type="file"
                            accept="image/*"
                            // style={{
                            // }} 
                            {...register("imageFile")}
                        />
                        <FormHelperText>{errors.imageFile?.message}</FormHelperText>
                    </FormControl>
                    <br />

                    {coupon?.image &&
                        <>
                            <img
                                src={coupon?.image}
                                alt={coupon?.title} title={coupon?.title}
                            />
                            <br />
                        </>
                    }

                    <ButtonGroup className="Group" variant="text" fullWidth>

                        <Button
                            className="A"
                            startIcon={<Send />}
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            Confirm
                        </Button>

                        <Button
                            className="B"
                            startIcon={<ClearAll />}
                            type="reset"
                            color="secondary"
                            variant="contained"
                        >
                            Reset
                        </Button>

                    </ButtonGroup>
                </form>

            </div>
        </div>
    );
}

export default UpdateCompanyCoupon;