import React from 'react';
import "./familySearch.scss";
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

import ResultsModal from './ResultsModal/ResultsModal'

const FirbaseApi = require('../FirebaseApi')
const spinnerCss = css`
    display: block;
    margin: 6px auto;
`;

export default class FamilySearch extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fetchedResults: false,
            isLoading: false,
            availableFamilies: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.gotResults = this.gotResults.bind(this);
    }

    gotResults(results) {
        this.setState({
            fetchedResults: true,
            isLoading: false,
            availableFamilies: results
        })
        console.log(this.state);
    }

    handleSearch(event) {
        event.preventDefault();
        this.setState({ isLoading: true })
        FirbaseApi.searchFamily({
            adults: parseInt(this.state.adults),
            children: parseInt(this.state.children),
            isKosher: this.state.isKosher,
            isVeg: this.state.isVeg
        }, this.gotResults);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [target.name]: value
        });
    }

    render() {
        return (
            <div className="container">
                <ResultsModal show={this.state.fetchedResults} families={this.state.availableFamilies} />
                <form className={this.state.fetchedResults ? "hide" : "searchForm"}>
                    <input className="adultsInput" type="number" min="1" max="50" name="adults"
                        onChange={this.handleChange} />
                    <div className="inputDesc adults"> מספר מבוגרים </div>

                    <input className="childrenInput" type="number" min="0" max="50" name="children"
                        onChange={this.handleChange} />
                    <div className="inputDesc children">מספר ילדים</div>

                    <div className="checkboxForm">
                        <input name="isKosher" type="checkbox" className="checkbox"
                            onChange={this.handleChange} />
                        <div className="inputDesc kosher">כשר</div>

                        <input name="isVeg" type="checkbox" className="checkbox"
                            onChange={this.handleChange} />
                        <div className="inputDesc veg">צמחוני</div>
                    </div>

                    <button type="submit" value="Submit" onClick={this.handleSearch}>חפש</button>
                </form>
                <ClipLoader
                        css={spinnerCss}
                        sizeUnit={"px"}
                        size={40}
                        color={'#123abc'}
                        loading={this.state.isLoading}
                    />
            </div>
        )
    }
}
