import React, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import {auth, provider} from '../firebase';

export const AuthContext = React.createContext({
    user: null,
    login: () => {},
    logout: ()=> {}
});

const AuthContextProvider = props => {
    const [user, setUser] = useState(null);

    useEffect(() => {
       const unsub = auth.onAuthStateChanged(authUser => {
            if(authUser){
                setUser(authUser);
            }else{
                setUser(null)
            }
        })
        return () => {
            unsub();
        }
    }, [user]);

    const loginHandler = () =>{
        auth.signInWithPopup(provider)
        .catch((error) => {
            toast.error(error.message, {position: 'top-center'});
          });
    }

    const logoutHandler =() =>{
        auth.signOut();
        setUser(null);
    }
    
    return (
        <AuthContext.Provider value={{user: user, login: loginHandler, logout: logoutHandler}}>
            {props.children}
        </AuthContext.Provider>
    );
    
}

export default AuthContextProvider;