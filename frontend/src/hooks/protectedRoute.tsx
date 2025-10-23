import { Navigate } from "react-router-dom";

import { UseAuth } from "./useAuth";


interface ProtectedRouteProps {
    children: React.ReactNode
}

export const ProtectedRoute = ({children}:ProtectedRouteProps)=>{

    const {isAuthenticated} = UseAuth()

    if (!isAuthenticated){
        return <Navigate to={'/auth/login'} replace />
    }
    return<>{children}</>
}