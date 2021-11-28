import { NavLink } from "react-router-dom";
import "./Nav.css";

function Nav(): JSX.Element {
    return (
        <div className="Nav">
            <ul>
                <li><NavLink to="/register" exact>Register</NavLink></li>
                <li><NavLink to="/login" exact>Login</NavLink></li>
                <li><a href="https://my-portfolio-site-frontend.herokuapp.com" target="_blank">Portfolio</a></li>
                <li><a href="https://www.linkedin.com/in/chelly-izraelov" target="_blank">Linkedin</a></li>
                <li><a href="https://github.com/itsmechelly" target="_blank">Github</a></li>
            </ul>
        </div>
    );
}

export default Nav;