import CouponModel from "../Models/CouponModel";

export class CouponsState {
    public coupons: CouponModel[] = [];
}

export enum CouponsActionType {
    CouponDownloaded = "CouponDownloaded",
    CouponAdded = "CouponAdded",
    CouponUpdated = "CouponUpdated",
    CouponDeleted = "CouponDeleted"
}

export interface CouponAction {
    type: CouponsActionType;
    payload?: any;
}

export function couponsDownloadedAction(coupons: CouponModel[]): CouponAction {
    return { type: CouponsActionType.CouponDownloaded, payload: coupons };
}

export function couponsAddedAction(coupon: CouponModel): CouponAction {
    return { type: CouponsActionType.CouponAdded, payload: coupon };
}

export function couponUpdatedAction(coupon: CouponModel): CouponAction {
    return { type: CouponsActionType.CouponUpdated, payload: coupon };
}

export function couponDeletedAction(id: number): CouponAction {
    return { type: CouponsActionType.CouponDeleted, payload: id };
}

export function couponsReducer(currentState: CouponsState = new CouponsState(), action: CouponAction): CouponsState {

    let newState = { ...currentState };
    let index;

    switch (action.type) {
        case CouponsActionType.CouponDownloaded:
            newState.coupons = action.payload;
            break;
        case CouponsActionType.CouponAdded:
            newState.coupons.push(action.payload);
            break;
        case CouponsActionType.CouponUpdated:
            index = newState.coupons.findIndex(element => element.id === action.payload.id);
            newState.coupons[index] = action.payload;
            break;
        case CouponsActionType.CouponDeleted:
            index = newState.coupons.findIndex(element => element.id === action.payload.id);
            newState.coupons.splice(index, 1);
            break;
    }

    return newState;
}