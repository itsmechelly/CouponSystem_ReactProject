export enum ClientType {
    ADMIN="ADMIN",
    COMPANY="COMPANY", 
    CUSTOMER="CUSTOMER"
}
//this model is for the registration and the attribute name should be same as in the server.


class UserModel {
    // public id?: number;
    // public firstName?: string;
    // public lastName?: string;
    public email: string;
    public password: string;
    public clientName?: ClientType;
    public clientType: string;
    public token?: string;
}

export default UserModel;