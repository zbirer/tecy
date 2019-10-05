import React from "react"
const enhanceWithClickOutside = require('react-click-outside');

import './familyBox.scss'

class FamilyBox extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            family: props.family,
            showPhone: false
        }

        this.toggleShowPhoneNumber = this.toggleShowPhoneNumber.bind(this);
    }

    toggleShowPhoneNumber(event) {
        this.setState((currState) => ({
            showPhone: !currState.showPhone
        }));
    }

    handleClickOutside() {
        this.setState({
            showPhone: false
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            family: props.family,
        });
    }

    render() {
        const family = this.state.family;
        if (!this.state.showPhone) {
            return (
                <div className={this.state.showPhone ? "familyBox selected" : "familyBox"} onClick={this.toggleShowPhoneNumber}>
                    <span className="boxHeader">  משפחת {family.name} </span>
                    <br />
                    {family.address}
                    <br /><br />
                    {family.kosher ? "אוכל כשר" : "אוכל לא כשר"}
                    <br />
                    {family.vegetarian ? "אוכל צמחוני" : "אוכל לא צמחוני"}
                </div>
            );
        } else {
            return (
                <div className="familyBox" onClick={this.toggleShowPhoneNumber}>
                    <div className="phoneNumber">
                        <span className="boxHeader">  פרטי תקשורת </span>
                        <br />
                        <span>טלפון: {family.phone_number} </span>
                    </div>
                </div>
            )
        }
    }
}

export default enhanceWithClickOutside(FamilyBox);