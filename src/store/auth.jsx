import { useContext, createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isLoding, setIsLoding] = useState(true)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState("")
    const [progress, setProgress] = useState(0)

    const saveTokenToLs = (token) => {
        setToken(token)
        return localStorage.setItem("token", token)
    }

    let isLoggedIn = !!token;

    const logoutUser = () => {
        setToken("")
        toast.success("Logout Successfully")
        return localStorage.removeItem("token")
    }
    const userAuthentication = async () => {
        try {
            setIsLoding(true)
            setProgress(100)
            const response = await fetch("https://backent-protfolio.onrender.com/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                setProgress(100)
                const data = await response.json();
                setUser(data)
                setIsLoding(false)
                setProgress(0)
            }
        } catch (error) {
            setIsLoding(false)
        }
    }
    useEffect(() => {
        userAuthentication()
    }, [])
    return (
        <AuthContext.Provider value={{ saveTokenToLs, logoutUser, isLoggedIn, user, token, isLoding,userAuthentication,progress,setProgress }}>
            {children}
        </AuthContext.Provider>
    )
};
export const useAuth = () => {
    const contextValue = useContext(AuthContext)
    return contextValue;
}