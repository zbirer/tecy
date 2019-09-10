import React from 'react'
import './resultsModal.scss'
import { isArray } from 'util';

export default function ResultsModal(props) {
    const modalDisplayClass = props.show ? 'modal display' : 'modal hide';

    if (isArray(props.families)) {
        const families = props.families;
        if (families.length > 0) {
            return (
                <div className={modalDisplayClass}>
                    {
                        families.map((family, index) => {
                            return (
                                <div className="familyBox">
                                    <span className="familyName">  משפחת {family.name} </span>
                                    <br />
                                    {family.address}
                                    <br /><br />
                                    {family.kosher ? "אוכל כשר" : "אוכל לא כשר"}
                                    <br />
                                    {family.vegetarian ? "אוכל צמחוני" : "אוכל לא צמחוני"}
                                </div>
                            )
                        })
                    }
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