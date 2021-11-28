import "./Jumbotron.css";

function Jumbotron(): JSX.Element {
    return (
        <div className="Jumbotron">
            <div className="JumbotronContainer">
                <h2>Curious? Want to See More?</h2>
                <p>Let's take our relationship one step ahead</p>
                <p>Feel free to take a look at my Portfolio!</p>
                <a className="btn" href="https://my-portfolio-site-frontend.herokuapp.com" target="_blank">Click Here</a>

            </div>
        </div>
    );
}

export default Jumbotron;
