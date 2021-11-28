import Logo from "../../../Assets/Images/Logo.png";

import "./Home.css";

function Home(): JSX.Element {
    return (
        <div className="Home">
            <div className="HomeContainer">
                <img className="LogoImg" src={Logo} alt="Logo Image" style={{ width: '1000', height: '300' }} />

                <h2>Our Coupon System</h2>
                <p>Join us for the best shopping experience you can ever find, and you will get the top products available on the market today.</p>
                <p>We are here to help you make educated purchases with the best coupons and the biggest discounts.</p>
                <p>We are committed to providing you the best deals online.</p>
                <p>Hurry up, before all the wonderful coupons will run out!</p>
            </div>
        </div>
    );
}

export default Home;
