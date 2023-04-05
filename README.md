# CouponSystem_ReactProject

This application is the final project I created during my software studies.<br/>
The application is a Fullstack project, it is written in Java language on the server side and in React on the client side.

### 🤔 What is the purpose of this application?
This is a coupon management system that allows companies to generate coupons as part of advertising and marketing campaigns that they run.<br/>
The system also has registered customers, the customers can purchase coupons, coupons are limited in quantity and validity, a customer is limited to one coupon of each type.<br/>
The system records the coupons purchased by each customer.<br/>
The revenue of the system is from the purchase of coupons by the customers and by the creation of new coupons by the companies.

### 💻 Access to the system is divided into three types of clients:
1. Administrator - manages the system, managing the lists of companies and the customers.<br/>
2. Company – managing a list of coupons associated with the company.<br/>
3. Customer - who buy coupons.<br/>

# The project structure:
This project is the client side of the “Coupon System" application.<br/>
This part of the application was written using React libraries and is built as a Single Page Application (SPA).<br/>
Communication with the server side is done by using RESTful API.

## Layout
In terms of the project structure, there is a main layout for the website's main page, that also contains a link to the login page. In addition, after logging in, the client will be transferred to a special layout according to the client type(I created a different page for the 3 types of users).

## Components
I build components adapted for all the actions and operations that exist in the system.<br/>
The components are arranged according to the types of clients. Each client has actions that he is authorized to perform (for example an admin can delete a company, and he is the only one authorized to do so).

## Models
I added Models that correspond to the Java Beans classes that are on the server side.

## Routing
Routing mechanism that is suitable for the various Routes that exist on the server side.

## Redux
I used Redux which manage and update the state of an application.

## Design
The design done by using CSS, Material UI and Bootstrap.

# And what about the Server side?
For the Server side I used Java language and Spring Framework.<br/>
To store data in the database I used Spring Hibernate JPA(SQL).<br/>
For the authentication & authorization I used the JWT technique.<br/>

👉 Click here to see this project on Github:
https://github.com/itsmechelly/CouponSystem_SpringProject_JwtTechnique<br/><br/>
👉 NOTE: this project is the final version and deployed to AWS cloud, click to browse the website:<br/>
LINK WILL BE ADDED SOON
<br/><br/>
👉 To login, use those details:<br/>
Admin: ➡️ e-mail: admin@admin.com password: admin<br/>
Company: ➡️ e-mail: zootAllures@company.com password: zootAllures<br/>
Customer: ➡️ e-mail: cust1@cust.com password: 1111<br/>


# Endpoints
Please click the link below to browse the website:<br/>
LINK WILL BE ADDED HERE SOON<br/>
<br/><br/>
👉 Note: to login, use those details:<br/>
Admin: ➡️ e-mail: admin@admin.com password: admin<br/>
Company: ➡️ e-mail: zootAllures@company.com password: zootAllures<br/>
Customer: ➡️ e-mail: cust1@cust.com password: 1111<br/>

## Admin Controller:
👉 Note: to enter those routes you should first login, you can use those details:
e-mail: admin@admin.com password: admin

```http
admin/addCompany 
```
```http
admin/addCompany 
```
```http
/admin/updateCompany 
```
```http
/admin/deleteCompany/{companyId} 
```
```http
/admin/getOneCompanyById/{companyId} 
```
```http
/admin/getAllCompanies 
```
```http
/admin/addCustomer 
```
```http
/admin/updateCustomer 
```
```http
/admin/deleteCustomer/{customerId} 
```
```http
/admin/getOneCustomerById/{customerId} 
```
```http
/admin/getAllCustomers 
```

## Company Controller:
👉 Note: to enter those routes you should first login, you can use those details:
e-mail: zootAllures@company.com password: zootAllures

```http
/company/addCompanyCoupon 
```
```http
/company/updateCompanyCoupon 
```
```http
/company/deleteCompanyCoupon 
```
```http
/company/getAllCompaniesCoupons 
```
```http
/company/getAllCouponsByCategory/{couponCategory} 
```
```http
/company/getAllCouponsUnderMaxPrice 
```
```http
/company/getCompanyDetails 
```

## Customer Controller:
👉 Note: to enter those routes you should first login, you can use those details:
e-mail: cust1@cust.com password: 1111


```http
/customer/purchaseCoupon 
```
```http
/customer/getAllCustomerCoupons 
```
```http
/customer/getAllCouponsByCategory/{couponCategory} 
```
```http
/customer/getAllCouponsUnderMaxPrice 
```
```http
/customer/getCustomerDetails 
```

# ⚒️ Tech Stack
Language & Framework: Java Language, Spring Framework
<br/>
Database: Spring Hibernate, Spring JPA (MySQL Driver), SQL, MySQL
<br/>
Authentication & Authorization: JSON Web Token (JWT) library
<br/>
Scheduling Mechanisms: Spring Scheduling
<br/>
Architecture & Design Patterns: Spring MVC Layers, Singleton Pattern, Facade Pattern, Factory Pattern
<br/>
Communication between Client side and Server side: Restful API
<br/>
Client-Side: React, JavaScript, Typescript, Material UI, Bootstrap 5, HTML, CSS
<br/>


<br/>
Thanks for reading,
<br/>
Chelly 👩🏻‍💻
