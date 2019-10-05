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
            adults: 0,
            children: 0,
            isKosher: false,
            isVeg: false,
            availableFamilies: {},
            adultsNumError: "",
            childrenNumError: "",
            nameError: "",
            townError: "",
            phoneError:"",
            isAdultsNumValid: false,
            isChildrenNumValid: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.gotResults = this.gotResults.bind(this);
        this.toggleFetchedResults = this.toggleFetchedResults.bind(this);
    }

    toggleFetchedResults() {
        this.setState((currState) => ({
            fetchedResults: !currState.fetchedResults
        }));
    }

    gotResults(results) {
        this.setState({
            fetchedResults: true,
            isLoading: false,
            availableFamilies: results
        })
    }

    handleSearch(event) {
        event.preventDefault();
        this.setState({ isLoading: true })
        FirbaseApi.searchFamily({
            adults: this.state.adults,
            children: this.state.children,
            isKosher: this.state.isKosher,
            isVeg: this.state.isVeg
        }, this.gotResults);
    }

    handleChange(event) {
        const target = event.target;
        const value = this.getFieldValidatedValue(target);
        this.setState({
            [target.name]: value
        });
    }

    getFieldValidatedValue(modifiedField) {
        if (modifiedField.type === 'checkbox') {
            return modifiedField.checked
        }

        if (modifiedField.type == "number") {
            if (parseInt(modifiedField.value) >= 0) {
                return parseInt(modifiedField.value);
            } else if (isNaN(modifiedField.value) || modifiedField.value == "") {
                return "";
            }
        }

        return 0;
    }

    render() {
        return (
            <div className="container">
                <ResultsModal toggleShow={this.toggleFetchedResults} show={this.state.fetchedResults} families={this.state.availableFamilies} />
                <form className={this.state.fetchedResults ? "hide" : "searchForm"}>
                    <input className="adultsInput" type="number" min="0" name="adults"
                        onChange={this.handleChange} value={this.state.adults} />
                    <div className="inputDesc adults"> מספר מבוגרים </div>

                    <input className="childrenInput" type="number" name="children"
                        onChange={this.handleChange} value={this.state.children} />
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
