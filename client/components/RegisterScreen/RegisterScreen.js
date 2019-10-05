import React from 'react';
import './registerScreen.scss';

const FirbaseApi = require('../FirebaseApi')

export default class RegisterScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            responseArrived: false,
            registerValid: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.sendForm = this.sendForm.bind(this);
    }

    sendForm(event) {
        event.preventDefault();

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

        console.log(Object.entries(this.state));
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleCheckboxChange(event) {
        this.setState({
            [event.target.name]: event.target.checked
        });
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
                            <input className={'registerScreen_input'} name="name" type="text"
                                onChange={this.handleChange} />
                        </div>
                        <div>
                            <label className={'registerScreen_input_header'}>עיר/ישוב
                            מגורים</label>
                            <input className={'registerScreen_input'} name="address" type="text"
                                onChange={this.handleChange} />
                        </div>
                        <div>
                            <label className={'registerScreen_input_header'}>כמות מבוגרים שניתן
                            לארח</label>
                            <input className={'registerScreen_input'} name="capacity_adults"
                                type="number" onChange={this.handleChange} />
                        </div>
                        <div>
                            <label className={'registerScreen_input_header'}>כמות הילדים שניתן
                            לארח</label>
                            <input className={'registerScreen_input'} name="capacity_kids"
                                type="number" onChange={this.handleChange} />
                        </div>
                        <div>
                            <label className={'registerScreen_input_header'}>טלפון</label>
                            <input className={'registerScreen_input'} name="phone_number"
                                type="text" onChange={this.handleChange} />
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
        } else if(this.state.registerValid) {
            return <div className="successMessage">
                נרשמת בהצלחה כמארח
            </div>
        } else {
            return <div  className="errorMessage">
                ישנה שגיאה, אנא פנה לצוות תמיכה תכנית
            </div>
        }
    }
}
