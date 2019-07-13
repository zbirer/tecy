import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import MainScreen from "./components/MainScreen/MainScreen"
import FamilySearch from "./components/FamilySearch/FamilySearch"
import { TopBar } from "./components/TopBar/TopBar"

export default () => {
    return (
        <div>
            <TopBar />
            <Router>
                <Route exact path="/" component={MainScreen} />
                <Route exact path="/search/" component={FamilySearch} />
            </Router>
        </div>
    )
}