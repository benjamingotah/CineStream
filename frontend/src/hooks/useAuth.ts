import { useEffect, useState } from "react";
import { LoginUser, UserManager, tokenManager } from "./auth";
import type { User, LoginRequest} from "./auth";

import { useNavigate } from "react-router-dom";



export const UseAuth = () =>{
    const navigate = useNavigate()

    const [user, setUser] = useState<User | null>(null)
    const[loading, setLoading]= useState(true)

    useEffect(()=>{
        const checkAuth = async () => {
            try{
                const currentUser = UserManager.getcurrentUser()

                if(currentUser &&UserManager.isAuthenticated()){
                    setUser(currentUser)
                }

            }catch(error){
                console.error(error)
                UserManager.logout()
            }finally{
                setLoading(false)
            }
        }
        checkAuth()
    },[])

    const login = async(payload: LoginRequest) =>{
        try{
            const response = await LoginUser(payload)
            setUser(response.user)
            UserManager.setUser(response.user)
            tokenManager.setToken(response.token)
            return {
                success: true, user: UserManager.getUser()
            }

        }catch(error){
            console.error(error)
        }finally{
            setLoading(false)
        }
    }

    const logout = ()=>{
        UserManager.logout()
        setUser(null)
        navigate('/auth/login')
        
    }

    return{
        user,
        loading,
        login,
        logout,
        isAuthenticated: UserManager.isAuthenticated()
    }
}