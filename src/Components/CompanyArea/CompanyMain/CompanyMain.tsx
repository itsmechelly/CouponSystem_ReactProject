import { NavLink } from "react-router-dom";
import CompanyRouting from "../../LayoutArea/Routing/CompanyRouting/CompanyRouting";
import "./CompanyMain.css";

function CompanyMain(): JSX.Element {
    return (
        <div className="CompanyMain">
            <div className="first w3-sidebar w3-bar-block w3-card w3-animate-left" id="mySidebar" onClick={w3_close}>
                <button className="w3-bar-item w3-button w3-large">Close &times;</button>
                <br />
                <NavLink to="/company" exact className="w3-bar-item w3-button">Home Page</NavLink>
                <NavLink to="/company/addCompanyCoupon" exact className="w3-bar-item w3-button">Add Coupon</NavLink>
                <NavLink to="/company/deleteCompanyCoupon" exact className="w3-bar-item w3-button">Delete Coupon</NavLink>
                <NavLink to="/company/getAllCompaniesCoupons" exact className="w3-bar-item w3-button">Get All Coupons</NavLink>
                <NavLink to="/company/getAllCouponsByCategory" exact className="w3-bar-item w3-button">Get All Coupons By Category</NavLink>
                <NavLink to="/company/getAllCouponsUnderMaxPrice" exact className="w3-bar-item w3-button">Get All Coupons Under Max Price</NavLink>
                <NavLink to="/company/getCompanyDetails" exact className="w3-bar-item w3-button">Get Company Details</NavLink>
            </div>

            <div id="main">
                <div className="w3-teal">
                    <button id="openNav" className="w3-button w3-teal w3-xlarge" onClick={w3_open}>&#9776;</button>
                    <div className="w3-container">
                        <h1 className="start">Welcome Back</h1>
                        <p className="start"> Let's Get Started.</p>
                    </div>
                </div>

                <CompanyRouting />
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

export default CompanyMain;
