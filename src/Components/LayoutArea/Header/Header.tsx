import { NavLink } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <div className="HeaderContainer">
                <AuthMenu />
                <h1>Coupon Express</h1>
                <p>Shop today's best coupons and save your money</p>
                <a className="btn" href="/login"><NavLink to="/login" exact>Login</NavLink></a>
            </div>
        </div>
    );
}

export default Header;