import React from 'react';
import axios from 'axios';
import './registerScreen.scss';

export default class RegisterScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.sendForm = this.sendForm.bind(this);
    }

    sendForm(event) {
        event.preventDefault();
        axios.post("http://localhost:5000/families-hosting/us-central1/api/addfamily/", this.state)
            .then(res => console.log(res))
            .catch(reason => console.log(reason));

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
        return <div className={'registerScreen'}>
            <div className={'registerScreen__message'}>
                <h1>הרשמה</h1>
                <form onSubmit={this.sendForm}
                      className={'registerScreen__message_content'}>
                    <div>
                        <label className={'registerScreen_input_header'}>שם משפחה</label>
                        <input className={'registerScreen_input'} name="name" type="text"
                               onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label className={'registerScreen_input_header'}>עיר/ישוב
                            מגורים</label>
                        <input className={'registerScreen_input'} name="address" type="text"
                               onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label className={'registerScreen_input_header'}>כמות מבוגרים שניתן
                            לארח</label>
                        <input className={'registerScreen_input'} name="capacity_adults"
                               type="number" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label className={'registerScreen_input_header'}>כמות הילדים שניתן
                            לארח</label>
                        <input className={'registerScreen_input'} name="capacity_kids"
                               type="number" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label className={'registerScreen_input_header'}>טלפון</label>
                        <input className={'registerScreen_input'} name="phone_number"
                               type="text" onChange={this.handleChange}/>
                    </div>
                    <label className={'registerScreen_input_header'}>סוג האוכל</label>
                    <br/>
                    <label className={'registerScreen_input_header'}>
                        כשר:<input name="kosher" type="checkbox"
                                   onChange={this.handleCheckboxChange}/>
                    </label>
                    <br/>
                    <label className={'registerScreen_input_header'}>
                        צמחוני:<input name="vegetarian" type="checkbox"
                                      onChange={this.handleCheckboxChange}/>
                    </label>
                    <hr/>
                    <button className={'registerScreen_input_button'} type="submit">הרשם
                    </button>
                </form>
            </div>
        </div>;
    }
}
