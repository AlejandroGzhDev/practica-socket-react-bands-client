import React from 'react'
import HomePage from './Pages/HomePage'
import { SocketProvider } from './context/SocketContext'

const AppBandsName = () => {
    return (
        <SocketProvider>
            <HomePage/>
        </SocketProvider>
    )
}

export default AppBandsName
