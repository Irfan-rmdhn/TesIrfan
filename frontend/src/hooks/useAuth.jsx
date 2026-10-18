import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    user:null,
    register:()=>{},
    login:()=>{},
    logout:()=>{},
})

export default function UseAuthProvider({children}){
    const [user,setUser] = useState(()=>{
        const item = localStorage.getItem('user')
        return (item && item !== undefined ) ? JSON.parse(item):null
    })
    const login = (userdata)=>{
        setUser(userdata)
        localStorage.setItem('user',JSON.stringify(userdata))
    }
    const register = (userdata)=>{
        setUser(userdata)
        localStorage.setItem('user',JSON.stringify(userdata))
    }
    const logout = (userdata)=>{
        setUser(userdata)
        localStorage.removeItem('user',JSON.stringify(userdata))
    }
    return <AuthContext.Provider value={{user,login,register,logout}}>
        {children}
    </AuthContext.Provider>
}
export const useAuth = ()=> useContext(AuthContext)