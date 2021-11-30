import { Button, ButtonGroup, IconButton, InputAdornment, TextField, Typography } from "@material-ui/core";
import { Add, ClearAll, Send, Visibility, VisibilityOff } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CompanyModel from "../../../../Models/CompanyModel";
import { ClientType } from "../../../../Models/UserModel";
import { companyAddedAction } from "../../../../Redux/CompaniesState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/jwtAxios";
import notify from "../../../../Services/Notification";
import "./AddCompany.css";

function AddCompany(): JSX.Element {

    return (
        <div className="AddCompany">
            <div className="Container">

                <Add />
                <Typography variant="h3" className="Headline">
                    Add Company
                </Typography>

            </div>
        </div >
    );
}

export default AddCompany;