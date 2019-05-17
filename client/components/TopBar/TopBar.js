import React from "react";

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
                {
                    TOP_BAR_ITEMS.map(item => {
                        return <div className={"topBar__item"}>{item}</div>
                    })
                }
            </div>
        )
    }

}