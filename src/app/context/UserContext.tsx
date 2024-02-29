'use client';
import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, ReactNode } from "react";
import axios from "axios";
interface ContextProps {
    userDetails: any,
    isLoggedin: any,
    userSubscribedChannels: any,
    setuserDetails: Dispatch<SetStateAction<any>>,
    setisLoggedin: Dispatch<SetStateAction<any>>,
    setUserSubscribedChannels: Dispatch<SetStateAction<any>>
}

const UserContext = createContext<ContextProps>({
    userDetails: {},
    isLoggedin: false,
    userSubscribedChannels: [],
    setuserDetails: () => {},
    setisLoggedin: () => {},
    setUserSubscribedChannels: () => {}
})

export const UserContextProvider = ({ children }: {children: ReactNode}) =>{
    const [userDetails, setuserDetails] = useState<any>({});
    const [isLoggedin, setisLoggedin] = useState(false)
    const [userSubscribedChannels, setUserSubscribedChannels] = useState([]);

    useEffect(() =>{
        getTokenUser();
    }, [])

    useEffect(() => {
        if(userDetails?._id){
            getUserSubscribedChannels(userDetails?._id);
        }
    }, [userDetails])

    return(
        <UserContext.Provider value={{userDetails, isLoggedin,userSubscribedChannels, setUserSubscribedChannels, setisLoggedin, setuserDetails}}>
            {children}
        </UserContext.Provider>
    )

    async function getTokenUser(){
        const refreshTokenResponse = await getRefreshTokenfromServer();
        const response = await getUserDetails();
        const userSubscribedChannels = await getUserSubscribedChannels(userDetails?._id);
    }

    async function getUserDetails(){
        if(accessToken()){
            const user = await axios.get('/user/current-user/');
            setuserDetails(user.data.data);
            setisLoggedin(true);
        }
    }

    async function getUserSubscribedChannels(id: string){
        if(accessToken() && id){
            const userSubscribedChannels = await axios.get(`/subscriptions/c/${id}`);
            setUserSubscribedChannels(userSubscribedChannels.data.data);
        }
    }

    async function getRefreshTokenfromServer(){
        const refreshToken = localStorage.getItem('refresh');
        console.log('refreshToken', refreshToken);
        
        if(refreshToken){
            try{
                let response = await axios.post('/user/refresh-token/', {refreshToken: refreshToken});
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