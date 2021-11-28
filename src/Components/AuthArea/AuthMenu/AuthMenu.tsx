import { Component } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import "./AuthMenu.css";


interface AuthMenuState {
    user: UserModel;
}

class AuthMenu extends Component<{}, AuthMenuState> {

    public constructor(props: {}) {
        super(props);
        this.state = { user: store.getState().AuthState.user };
    }

    public componentDidMount(): void {
        store.subscribe(() => {
            this.setState({ user: store.getState().AuthState.user });
        });
    }

    public render(): JSX.Element {
        return (
            <div className="AuthMenu">
                {
                    this.state.user && <>
                        <span>Hello {this.state.user.clientName + " "}</span>
                        <span> | </span>
                        <NavLink to="/logout">Logout</NavLink>
                    </>
                }
                {
                    !this.state.user && <>
                        <span>Hello Guest</span>
                        <span> | </span>
                        <NavLink to="/login">Login</NavLink>
                        <span> | </span>
                        <NavLink to="/register">Register</NavLink>
                    </>
                }
            </div>
        );
    }
}

export default AuthMenu;
