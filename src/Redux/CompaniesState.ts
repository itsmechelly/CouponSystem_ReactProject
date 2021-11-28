import CompanyModel from "../Models/CompanyModel";

export class CompaniesState {
    public companies: CompanyModel[] = [];
}

export enum CompaniesActionType {
    CompanyDownloaded = "CompanyDownloaded",
    CompanyAdded = "CompanyAdded",
    CompanyUpdated = "CompanyUpdated",
    CompanyDeleted = "CompanyDeleted"
}

export interface CompanyAction {
    type: CompaniesActionType;
    payload?: any;
}

export function companiesDownloadedAction(companies: CompanyModel[]): CompanyAction {
    return { type: CompaniesActionType.CompanyDownloaded, payload: companies };
}

export function companyAddedAction(company: CompanyModel): CompanyAction {
    return { type: CompaniesActionType.CompanyAdded, payload: company };
}

export function companyUpdatedAction(company: CompanyModel): CompanyAction {
    return { type: CompaniesActionType.CompanyUpdated, payload: company };
}

export function companyDeletedAction(id: number): CompanyAction {
    return { type: CompaniesActionType.CompanyDeleted, payload: id };
}

export function companiesReducer(currentState: CompaniesState = new CompaniesState(), action: CompanyAction): CompaniesState {

    let newState = { ...currentState };
    let index;

    switch (action.type) {
        case CompaniesActionType.CompanyDownloaded:
            newState.companies = action.payload;
            break;
        case CompaniesActionType.CompanyAdded:
            newState.companies.push(action.payload);
            break;
        case CompaniesActionType.CompanyUpdated:
            index = newState.companies.findIndex(element => element.id === action.payload.id);
            newState.companies[index] = action.payload;
            break;
        case CompaniesActionType.CompanyDeleted:
            index = newState.companies.findIndex(element => element.id === action.payload.id);
            newState.companies.splice(index, 1);
            break;
    }

    return newState;
}