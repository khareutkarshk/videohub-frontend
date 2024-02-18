'use client';
import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, ReactNode } from "react";
import axios from "axios";
interface ContextProps {
    userDetails: any,
    isLoggedin: any,
    setuserDetails: Dispatch<SetStateAction<any>>,
    setisLoggedin: Dispatch<SetStateAction<any>>
}

const UserContext = createContext<ContextProps>({
    userDetails: {},
    isLoggedin: false,
    setuserDetails: () => {},
    setisLoggedin: () => {},
})

export const UserContextProvider = ({ children }: {children: ReactNode}) =>{
    const [userDetails, setuserDetails] = useState({});
    const [isLoggedin, setisLoggedin] = useState(false)

    useEffect(() =>{
        getTokenUser();
    }, [])


    return(
        <UserContext.Provider value={{userDetails, isLoggedin, setisLoggedin, setuserDetails}}>
            {children}
        </UserContext.Provider>
    )

    async function getTokenUser(){
        const refreshTokenResponse = await getRefreshTokenfromServer();
        const response = await getUserDetails();
    }

    async function getUserDetails(){
        if(accessToken()){
            const user = await axios.get('/user/current-user/');
            setuserDetails(user.data.data);
            setisLoggedin(true);
        }
    }

    async function getRefreshTokenfromServer(){
        if(refreshToken()){
            try{
                let response = await axios.post('/user/refresh-token/', {refreshToken: refreshToken()});
            }catch(error){
                console.log(error);
            }
        }
    }

    function mapRefreshTokenResponse(response:any){
        if(response){
            for(const prop in response){
                if(prop){
                    localStorage.setItem(prop, response[prop]);
                }
            }
        }

    }

    function refreshToken(){
        return localStorage.getItem('refresh');
    }
    function accessToken(){
        return localStorage.getItem('access');
    }
};

export const useUserContext = () => useContext(UserContext)