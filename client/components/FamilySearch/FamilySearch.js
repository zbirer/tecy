import React from 'react';
import "./familySearch.scss"

export default class FamilySearch extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <form className="searchForm">
                    <input className="adultsInput" type="number" min="1" max="50" name="numOfAdults" />
                    <div className="inputDesc adults"> מספר מבוגרים </div>

                    <input className="childrenInput" type="number" min="0" max="50" name="numOfChildren" />
                    <div className="inputDesc children">מספר ילדים</div>

                    <div className="checkboxForm">
                        <input type="checkbox" className="checkbox" />
                        <div className="inputDesc kosher">כשר</div>

                        <input type="checkbox" className="checkbox" />
                        <div className="inputDesc veg">צמחוני</div>
                    </div>

                    <button type="submit" value="Submit" onClick={this.handleSearch}>חפש</button>
                </form>
            </div>
        )
    }
}
