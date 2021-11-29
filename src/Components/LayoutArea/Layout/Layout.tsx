import { BrowserRouter } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Footer from "../Footer/Footer";
import Routing from "../Routing/Routing";

function Layout(): JSX.Element {
    return (
        <BrowserRouter>
            <div className="Layout">
                <header>
                    <AuthMenu />
                </header>
                <main>
                    <Routing />
                </main>
                <footer className="footer">
                    <Footer />
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default Layout;
