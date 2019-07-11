import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import "./public/css/index.scss";

class Application extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Hello</div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));
