import ReactDOM from "react-dom";
import React from "react";
import MainScreen from "./components/MainScreen/MainScreen";

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

ReactDOM.render(<MainScreen/>, document.getElementById("root"));