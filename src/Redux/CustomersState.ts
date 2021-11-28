import CustomerModel from "../Models/CustomerModel";

export class CustomersState {
    public customers: CustomerModel[] = [];
}

export enum CustomersActionType {
    CustomerDownloaded = "CustomerDownloaded",
    CustomerAdded = "CustomerAdded",
    CustomerUpdated = "CustomerUpdated",
    CustomerDeleted = "CustomerDeleted"
}

export interface CustomerAction {
    type: CustomersActionType;
    payload?: any;
}

export function customersDownloadedAction(customers: CustomerModel[]): CustomerAction {
    return { type: CustomersActionType.CustomerDownloaded, payload: customers };
}

export function customerAddedAction(customer: CustomerModel): CustomerAction {
    return { type: CustomersActionType.CustomerAdded, payload: customer };
}

export function customerUpdatedAction(customer: CustomerModel): CustomerAction {
    return { type: CustomersActionType.CustomerUpdated, payload: customer };
}

export function customerDeletedAction(id: number): CustomerAction {
    return { type: CustomersActionType.CustomerDeleted, payload: id };
}

export function customersReducer(currentState: CustomersState = new CustomersState(), action: CustomerAction): CustomersState {

    let newState = { ...currentState };
    let index;

    switch (action.type) {
        case CustomersActionType.CustomerDownloaded:
            newState.customers = action.payload;
            break;
        case CustomersActionType.CustomerAdded:
            newState.customers.push(action.payload);
            break;
        case CustomersActionType.CustomerUpdated:
            index = newState.customers.findIndex(element => element.id === action.payload.id);
            newState.customers[index] = action.payload;
            break;
        case CustomersActionType.CustomerDeleted:
            index = newState.customers.findIndex(element => element.id === action.payload.id);
            newState.customers.splice(index, 1);
            break;
    }

    return newState;
}