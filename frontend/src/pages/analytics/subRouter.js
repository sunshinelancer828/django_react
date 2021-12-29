import React from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoute from '../../routes/protectedRouter'


const subRouter = () => {
    return (
        <div>
            <ProtectedRoute path="/main/analytics/"/>
        </div>
    )
}

export default subRouter
