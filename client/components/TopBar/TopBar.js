import React from "react";
import "./topBar.scss";

const TOP_BAR_ITEMS = [
    "יצירת קשר",
    "מי אנחנו?",
    "איך זה עובד?",
    "אפשר להתארח?",
    "רוצה לארח"
];

export class TopBar extends React.PureComponent {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={"topBar"}>
                <div className={"topBar__logo"} />
                <div className={"topBar__menu"}>
                {
                    TOP_BAR_ITEMS.map((item, index) => {
                        return <div className={"topBar__menu_item"} key={index}>{item}</div>
                    })
                }
                </div>
            </div>
        )
    }

}
