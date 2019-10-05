import React from 'react'
import './resultsModal.scss'
import { isArray } from 'util';
import FamilyBox from "./FamilyBox/FamilyBox"

export default class ResultsModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            families: props.families,
            show: props.show,
            toggleShow: props.toggleShow
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            families: props.families,
            show: props.show
        });
    }

    render() {
        const modalDisplayClass = this.state.show ? 'display' : 'hide';
        if (isArray(this.state.families)) {
            const families = this.state.families;
            if (families.length > 0) {
                return (
                    <div className={modalDisplayClass}>
                        <div className="modal">
                            <ul>
                                {
                                    families.map((currFamily, index) => {
                                        return (
                                            <li>
                                                <FamilyBox family={currFamily}></FamilyBox>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <button className="returnBtn" type="submit" value="Submit" onClick={this.state.toggleShow}>חיפוש חדש</button>
                    </div>
                )
            } else {
                return (
                    <div className={modalDisplayClass}>
                        לא נמצאו משפחות מתאימות
                    </div>
                )
            }
        }
        return (
            <div></div>
        )
    }
}