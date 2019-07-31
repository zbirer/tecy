import React from "react";
import "./registerScreen.scss";

const foodType = [
    "צמחוני",
    "טבעוני",
    "לא רלוונטי"
];

const inputMap = {
    'שם משפחה': 'text',
    'עיר\\ישוב מגורים': 'text',
    'כמות מבוגרים שניתן לארח': 'number',
    'כמות הילדים שניתן לארח': 'number',
    'טלפון' : 'text'
};

export default class RegisterScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.sendForm = this.sendForm.bind(this);
    }

    sendForm(event) {
        event.preventDefault();
        console.log(event.target);
    }

    render() {
        return <div className={"registerScreen"}>
            <div className={"registerScreen__message"}>
                <h1>הרשמה</h1>
                <form onSubmit={this.sendForm} className={"registerScreen__message_content"}>
                    {Object.entries(inputMap).map(([key, value]) => {
                        return <div>
                            <label className={"registerScreen_input_header"}>{key}</label>
                            <input className={"registerScreen_input"} type={value} name={key}/>
                        </div>
                    })}

                    <label className={"registerScreen_input_header"}>סוג האוכל</label>
                    <select className={"registerScreen_input"}>
                        {foodType.map((item, index) => {
                            return <option id={index} value={item}>{item}</option>
                        })}
                    </select>
                    <button className={"registerScreen_input_button"} type="submit">הרשם</button>
                </form>
            </div>
        </div>
    }
}