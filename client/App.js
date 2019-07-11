import React from 'react'
import MainScreen from "./components/MainScreen/MainScreen"
import { TopBar } from "./components/TopBar/TopBar"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default () => {
    return (
        <div>
            <TopBar />
            <Router>
                <Route exact path="/" component={MainScreen} />
                <Route exact path="/search/" component={TopBar} />
            </Router>
        </div>
    )
}