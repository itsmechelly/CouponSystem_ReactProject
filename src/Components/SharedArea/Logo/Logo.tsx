import logoImage from "../../../Assets/Images/Logo.png";

function Logo(): JSX.Element {
    return (
        <div className="Logo">
            <img src={logoImage} />
        </div>
    );
}

export default Logo;
