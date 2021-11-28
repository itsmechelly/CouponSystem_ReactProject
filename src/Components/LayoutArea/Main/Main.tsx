import Header from "../Header/Header";
import Home from "../Home/Home";
import Jumbotron from "../Jumbotron/Jumbotron";
import Nav from "../Nav/Nav";

function Main(): JSX.Element {
    return (
        <div className="Main">
            <Header />
            <Nav />
            <Home />
            <Jumbotron />
        </div>
    );
}

export default Main;
