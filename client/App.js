import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import MainScreen from "./components/MainScreen/MainScreen"
import FamilySearch from "./components/FamilySearch/FamilySearch"
import { TopBar } from "./components/TopBar/TopBar"
import RegisterScreen from './components/RegisterScreen/RegisterScreen';

export default () => {
    return (
        <div>
            <TopBar />
            <Router>
                <Route exact path="/" component={MainScreen} />
                <Route exact path="/search/" component={FamilySearch} />
                <Route exact path="/register" component={RegisterScreen} />
            </Router>
        </div>
    )
}