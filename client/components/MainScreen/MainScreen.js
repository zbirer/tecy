import React from "react";
import "./mainScreen.scss";

export default class MainScreen extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={"mainScreen"}>
            <div className={"mainScreen__message"}>
                <h1 className={"mainScreen__message_header"}>!ברוכים הבאים לבית מארח</h1>
                <p className={"mainScreen__message_content"}>האתר שלנו פותח את הלב בתקופות חירום למשפחות מאיזור הדרום<br/>שמעוניינות להתנתק קצת מהמציאות הקשה<br/>וליהנות משקט ומשלווה עד יחלוף זעם </p>
                <div className={"mainScreen_message_buttons"}>
                    <button className={"mainScreen__message_buttons_button"}>אפשר להתארח?</button>
                    <button className={"mainScreen__message_buttons_button"}>רוצה לארח</button>
                </div>
            </div>
        </div>
    }
}
