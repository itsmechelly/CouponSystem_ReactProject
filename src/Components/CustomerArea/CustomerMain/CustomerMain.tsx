import { NavLink } from "react-router-dom";
import CustomerRouting from "../../LayoutArea/Routing/CustomerRouting/CustomerRouting";
import "./CustomerMain.css";

function CustomerMain(): JSX.Element {
    return (
        <div className="CustomerMain">
            <div className="first w3-sidebar w3-bar-block w3-card w3-animate-left" id="mySidebar" onClick={w3_close}>
                <button className="w3-bar-item w3-button w3-large">Close &times;</button>
                <br />
                <NavLink to="/customer" exact className="w3-bar-item w3-button">Home Page</NavLink>
                <NavLink to="/customer/getAllCustomerCoupons" exact className="w3-bar-item w3-button">Get All Customer Coupons</NavLink>
                <NavLink to="/customer/getAllCouponsByCategory/" exact className="w3-bar-item w3-button">Get All Coupons By Category</NavLink>
                <NavLink to="/customer/getAllCouponsUnderMaxPrice" exact className="w3-bar-item w3-button">Get All Coupons Under Max Price</NavLink>
                <NavLink to="/customer/getCustomerDetails" exact className="w3-bar-item w3-button">Get Customer Details</NavLink>
            </div>

            <div id="main">
                <div className="w3-teal">
                    <button id="openNav" className="w3-button w3-teal w3-xlarge" onClick={w3_open}>&#9776;</button>
                    <div className="w3-container">
                        <h1 className="start">Welcome Back</h1>
                        <p className="start"> Let's Start with our SHOPPING.</p>
                    </div>
                </div>

                <CustomerRouting />
            </div>
        </div>
    );

    function w3_open() {
        document.getElementById("main").style.marginLeft = "25%";
        document.getElementById("mySidebar").style.width = "25%";
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("openNav").style.display = 'none';
    };

    function w3_close() {
        document.getElementById("main").style.marginLeft = "0%";
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("openNav").style.display = "inline-block";
    };
}

export default CustomerMain;