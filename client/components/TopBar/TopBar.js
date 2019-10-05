import React from "react";
import "./topBar.scss";
import {withRouter} from 'react-router-dom';

const TOP_BAR_ITEMS = [
{
   name: "יצירת קשר",
   route: "/"
},
{
    name: "?מי אנחנו",
    route: "/"
 },
 {
    name: "?איך זה עובד",
    route: "/"
 },
 {
    name: "?אפשר להתארח",
    route: "search"
 },
{
   name: "רוצה לארח",
   route: "register"
}];

class TopBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.redirect = this.redirect.bind(this);
    }

    redirect(path) {
        return () => this.props.history.push(path);
    }

    render() {
        return (
            <div className={"topBar"}>
                <div className={"topBar__logo"} />
                <div className={"topBar__menu"}>
                {
                    TOP_BAR_ITEMS.map((item, index) => {
                        return <div className={"topBar__menu_item"} key={index} onClick={this.redirect(item.route)}>{item.name}</div>
                    })
                }
                </div>
            </div>
        )
    }
}

export default withRouter(TopBar);