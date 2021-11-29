import "./AdminMain.css";
import { NavLink } from "react-router-dom";
import AdminRouting from "../../LayoutArea/Routing/AdminRouting/AdminRouting";

function AdminMain(): JSX.Element {
    return (
        <div className="AdminMain">
            <div className="first w3-sidebar w3-bar-block w3-card w3-animate-left" id="mySidebar" onClick={w3_close}>
                <button className="w3-bar-item w3-button w3-large">Close &times;</button>
                <br />
                <NavLink to="/admin" exact className="w3-bar-item w3-button">Home Page</NavLink>
                <br />
                <NavLink to="/admin/addCompany" exact className="w3-bar-item w3-button">Add Company</NavLink>
                <NavLink to="/admin/deleteCompany" exact className="w3-bar-item w3-button">Delete Company</NavLink>
                <NavLink to="/admin/getAllCompanies" exact className="w3-bar-item w3-button">Get All Companies</NavLink>
                <br />
                <NavLink to="/admin/addCustomer" exact className="w3-bar-item w3-button">Add Customer</NavLink>
                <NavLink to="/admin/deleteCustomer" exact className="w3-bar-item w3-button">Delete Customer</NavLink>
                <NavLink to="/admin/getAllCustomers" exact className="w3-bar-item w3-button">Get All Customers</NavLink>
            </div>

            <div id="main">
                <div className="w3-teal">
                    <button id="openNav" className="w3-button w3-teal w3-xlarge" onClick={w3_open}>&#9776;</button>
                    <div className="w3-container">
                        <h1>Welcome Back Admin, Let's Get Our Work DONE!</h1>
                    </div>
                </div>

                <AdminRouting />
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

export default AdminMain;

