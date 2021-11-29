import { BrowserRouter, Redirect, Route } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Login from "../../AuthArea/Login/Login";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Routing from "../Routing/Routing";

function Layout(): JSX.Element {
    return (
        <BrowserRouter>
            <div className="Layout">
                <header>
                    <AuthMenu />
                </header>
                <main>
                    {/* <Routing /> */}
                    <Route path="/layout" component={Main} exact />

                    {/* <Route path="/admin" component={AdminMain} />
                    <Route path="/company" component={CompanyMain} />
                    <Route path="/customer" component={CustomerMain} /> */}

                    {/* <Route path="/register" component={Register} exact /> */}
                    <Route path="/login" component={Login} exact />
                    {/* <Route path="/logout" component={Logout} exact /> */}

                    <Redirect from="/" to="/layout" exact />
                </main>
                <footer className="footer">
                    <Footer />
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default Layout;
