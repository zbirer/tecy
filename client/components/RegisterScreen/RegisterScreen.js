import React from 'react';
import './registerScreen.scss';
import { EventEmitter } from 'events';

const FirbaseApi = require('../FirebaseApi')

const VALID_NAME = /^[\u0590-\u05fe]{2,}([\s-']?[\u0590-\u05fe]+)?$/;
const VALID_PHONE = /^0\d([\d]{0,1})([-]{0,1})\d{7}$/;

export default class RegisterScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            responseArrived: false,
            registerValid: true,
            name: "",
            address: "",
            capacity_adults: 1,
            capacity_kids: 0,
            phone_number: "",
            kosher: false,
            vegetarian: false,
            adultsNumError: false,
            kidsNumError: false,
            nameError: false,
            addressError: false,
            phoneError: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.sendForm = this.sendForm.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.getValidatedNumberValue = this.getValidatedNumberValue.bind(this);
    }

    sendForm(event) {
        event.preventDefault();

        if (this.isFormValid()) {
            FirbaseApi.addFamily(this.state,
                (response) => {
                    this.setState({
                        responseArrived: true
                    });
                },
                (reason) => {
                    this.setState({
                        responseArrived: true,
                        registerValid: false
                    });
                });
        } else {
            console.log("errors");
        }
    }

    isFormValid() {
        const {
            name,
            address,
            capacity_adults,
            capacity_kids,
            phone_number
        } = this.state;

        const nameValid = VALID_NAME.test(name);
        const addressValid = VALID_NAME.test(address);
        const adultsNumValid = capacity_adults >= 1;
        const kidsNumValid = capacity_kids >= 0
        const phoneNumberValid = VALID_PHONE.test(phone_number);

        this.setState({
            nameError: !nameValid,
            addressError: !addressValid,
            adultsNumError: !adultsNumValid,
            kidsNumError: !kidsNumValid,
            phoneError: !phoneNumberValid
        });

        return nameValid && addressValid && adultsNumValid && kidsNumValid && phoneNumberValid;
    }

    handleChange(event) {
        let value;
        if (event.target.type == "number") {
            value = this.getValidatedNumberValue(event.target.value);
        } else {
            value = event.target.value;
        }

        this.setState({
            [event.target.name]: value,
        });
    }

    handleCheckboxChange(event) {
        this.setState({
            [event.target.name]: event.target.checked
        });
    }

    getValidatedNumberValue(value) {
        if (parseInt(value) >= 0) {
            return parseInt(value);
        } else if (isNaN(value) || value == "") {
            return "";
        }


        return 0;
    }

    render() {
        if (!this.state.responseArrived) {
            return <div className={'registerScreen'}>
                <div className={'registerScreen__message'} show={this.state.sentRegister}>
                    <h1>הרשמה</h1>
                    <form onSubmit={this.sendForm}
                        className={'registerScreen__message_content'}>
                        <div>
                            <label className={'registerScreen_input_header'}>שם משפחה</label>
                            <input className={'registerScreen_input'.concat(this.state.nameError ? " inputError" : '')}
                                name="name" type="text" onChange={this.handleChange} value={this.state.name} />
                        </div>
                        <div>
                            <label className={'registerScreen_input_header'}>עיר/ישוב
                            מגורים</label>
                            <input className={'registerScreen_input'.concat(this.state.addressError ? " inputError" : '')}
                                name="address" type="text" onChange={this.handleChange}
                                value={this.state.address} />
                        </div>
                        <div>
                            <label className={'registerScreen_input_header'}>כמות מבוגרים שניתן
                            לארח</label>
                            <input className={'registerScreen_input'.concat(this.state.adultsNumError ? " inputError" : '')}
                                name="capacity_adults" type="number" min="1" onChange={this.handleChange}
                                value={this.state.capacity_adults} />
                        </div>
                        <div>
                            <label className={'registerScreen_input_header'}>כמות הילדים שניתן
                            לארח</label>
                            <input className={'registerScreen_input'.concat(this.state.kidsNumError ? " inputError" : '')}
                                name="capacity_kids" type="number" min="0" onChange={this.handleChange}
                                value={this.state.capacity_kids} />
                        </div>
                        <div>
                            <label className={'registerScreen_input_header'}>טלפון</label>
                            <input className={'registerScreen_input'.concat(this.state.phoneError ? " inputError" : '')}
                                name="phone_number" type="text" onChange={this.handleChange}
                                value={this.state.phone_number} />
                        </div>
                        <label className={'registerScreen_input_header'}>סוג האוכל</label>
                        <br />
                        <label className={'registerScreen_input_header'}>
                            כשר:<input name="kosher" type="checkbox"
                                onChange={this.handleCheckboxChange} />
                        </label>
                        <br />
                        <label className={'registerScreen_input_header'}>
                            צמחוני:<input name="vegetarian" type="checkbox"
                                onChange={this.handleCheckboxChange} />
                        </label>
                        <hr />
                        <button className={'registerScreen_input_button'} type="submit">הרשם
                    </button>
                    </form>
                </div>
            </div>;
        } else if (this.state.registerValid) {
            return <div className="successMessage">
                נרשמת בהצלחה כמארח
            </div>
        } else {
            return <div className="errorMessage">
                ישנה שגיאה, אנא פנה לצוות תמיכה תכנית
            </div>
        }
    }
}
