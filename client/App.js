import React from 'react'
import MainScreen from "./components/MainScreen/MainScreen"
import {TopBar} from "./components/TopBar/TopBar"

export default () => {
    return (
        <div>
            <TopBar />
            <MainScreen />
        </div>
    )
}