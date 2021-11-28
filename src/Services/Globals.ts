class Globals {
}

class DevelopmentGlobals extends Globals {

    public theHost = "localhost";
    public thePort = "8080";

    public urls = {

        //Edit this later
        example: `http://${this.theHost}:${this.thePort}/admin/getAllCompanies`,

        addCompany: "http://localhost:8080/admin/addCompany",
        updateCompany: "http://localhost:8080/admin/updateCompany",
        deleteCompany: "http://localhost:8080/admin/deleteCompany/",
        getOneCompany: "http://localhost:8080/admin/getOneCompany/",
        getAllCompanies: "http://localhost:8080/admin/getAllCompanies",

        addCustomer: "http://localhost:8080/admin/addCustomer",
        updateCustomer: "http://localhost:8080/admin/updateCustomer",
        deleteCustomer: "http://localhost:8080/admin/deleteCustomer/",
        getOneCustomer: "http://localhost:8080/admin/getOneCustomer/",
        getAllCustomers: "http://localhost:8080/admin/getAllCustomers",

        addCompanyCoupon: "http://localhost:8080/company/addCompanyCoupon/",
        updateCompanyCoupon: "http://localhost:8080/company/updateCompanyCoupon",
        deleteCompanyCoupon: "http://localhost:8080/company/deleteCompanyCoupon/",
        getAllCompaniesCoupons: "http://localhost:8080/company/getAllCompaniesCoupons",
        getAllCompanyCouponsByCategory: "http://localhost:8080/company/getAllCouponsByCategory/",
        getAllCompanyCouponsUnderMaxPrice: "http://localhost:8080/company/getAllCouponsUnderMaxPrice/",
        getCompanyDetails: "http://localhost:8080/company/getCompanyDetails",

        purchaseCoupon: "http://localhost:8080/customer/purchaseCoupon",
        getAllCoupons: "http://localhost:8080/customer/getAllCoupons",
        getAllCustomerCoupons: "http://localhost:8080/customer/getAllCustomerCoupons",
        getAllAvailableForPurchase: "http://localhost:8080/customer/getAllCoupons",
        getAllCustomerCouponsByCategory: "http://localhost:8080/customer/getAllCouponsByCategory/",
        getAllCustomerCouponsUnderMaxPrice: "http://localhost:8080/customer/getAllCouponsUnderMaxPrice/",
        getCustomerDetails: "http://localhost:8080/customer/getCustomerDetails",

        register: "http://localhost:8080/register",
        login: "http://localhost:8080/login"

    };
}

class ProductionGlobals extends Globals {
    public urls = {

        addCompany: "https://couponexpress.herokuapp.com/admin/addCompany",
        updateCompany: "https://couponexpress.herokuapp.com/admin/updateCompany",
        deleteCompany: "https://couponexpress.herokuapp.com/admin/deleteCompany/",
        getOneCompany: "https://couponexpress.herokuapp.com/admin/getOneCompany/",
        getAllCompanies: "https://couponexpress.herokuapp.com/admin/getAllCompanies",

        addCustomer: "https://couponexpress.herokuapp.com/admin/addCustomer",
        updateCustomer: "https://couponexpress.herokuapp.com/admin/updateCustomer",
        deleteCustomer: "https://couponexpress.herokuapp.com/admin/deleteCustomer/",
        getOneCustomer: "https://couponexpress.herokuapp.com/admin/getOneCustomer/",
        getAllCustomers: "https://couponexpress.herokuapp.com/admin/getAllCustomers",

        addCompanyCoupon: "https://couponexpress.herokuapp.com/company/addCompanyCoupon/",
        updateCompanyCoupon: "https://couponexpress.herokuapp.com/company/updateCompanyCoupon",
        deleteCompanyCoupon: "https://couponexpress.herokuapp.com/company/deleteCompanyCoupon/",
        getAllCompaniesCoupons: "https://couponexpress.herokuapp.com/company/getAllCompaniesCoupons",
        getAllCompanyCouponsByCategory: "https://couponexpress.herokuapp.com/company/getAllCouponsByCategory/",
        getAllCompanyCouponsUnderMaxPrice: "https://couponexpress.herokuapp.com/company/getAllCouponsUnderMaxPrice/",
        getCompanyDetails: "https://couponexpress.herokuapp.com/company/getCompanyDetails",

        purchaseCoupon: "https://couponexpress.herokuapp.com/customer/purchaseCoupon",
        getAllCoupons: "https://couponexpress.herokuapp.com/customer/getAllCoupons",
        getAllCustomerCoupons: "https://couponexpress.herokuapp.com/customer/getAllCustomerCoupons",
        getAllAvailableForPurchase: "https://couponexpress.herokuapp.com/customer/getAllCoupons",
        getAllCustomerCouponsByCategory: "https://couponexpress.herokuapp.com/customer/getAllCouponsByCategory/",
        getAllCustomerCouponsUnderMaxPrice: "https://couponexpress.herokuapp.com/customer/getAllCouponsUnderMaxPrice/",
        getCustomerDetails: "https://couponexpress.herokuapp.com/customer/getCustomerDetails",

        register: "https://couponexpress.herokuapp.com/register",
        login: "https://couponexpress.herokuapp.com/login",

        // home: "https://couponexpress.herokuapp.com"

    };
}

const globals = process.env.NODE_ENV === "development" ? new DevelopmentGlobals() : new ProductionGlobals();
// const globals = new ProductionGlobals();

export default globals;