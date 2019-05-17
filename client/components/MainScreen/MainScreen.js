import React from "react";
import TopBAr, {TopBar} from "./../TopBar/TopBar";
import "./mainScreen.scss";

export default class MainScreen extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={"mainScreen"}>
            <TopBar />
            <p>Hi</p>
        </div>
    }
}