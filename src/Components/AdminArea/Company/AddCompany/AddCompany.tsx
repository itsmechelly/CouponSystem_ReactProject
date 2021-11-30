import { Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import "./AddCompany.css";

function AddCompany(): JSX.Element {

    return (
        <div className="AddCompany">

                <h1>BH</h1>

                <Add />
                <Typography variant="h3" className="Headline">
                    Add Company
                </Typography>
                
        </div >
    );
}

export default AddCompany;