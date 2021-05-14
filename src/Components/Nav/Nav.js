import { Avatar} from '@material-ui/core';
import React, { useState, useEffect, useContext} from 'react';
import { AuthContext } from '../../context/auth-context';
import './Nav.css';
import { NavLink, useHistory } from 'react-router-dom';

function Nav({watchlist}) {
    const [show, setShow] = useState(false);
    const authContext = useContext(AuthContext);
    const history = useHistory();
    
    const logoutHandler =() => {
        authContext.logout();
        history.push("/");
    }
    
    useEffect(() => {
        const listener = window.addEventListener("scroll", () => {
            if(window.scrollY > 100){
                setShow(true);
            }else{
                setShow(false);
            }
        });
        
        return () => {
          window.removeEventListener("scroll", listener);
        }
    }, []);

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
                className="nav__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
                alt="Netflix Logo"/>
            <div className="nav__items">
                {authContext.user && <NavLink to="/home" activeClassName="nav__linkActive"><button className="nav__wishlist">Home</button></NavLink>}
                {authContext.user && <NavLink to="/tv" activeClassName="nav__linkActive"><button className="nav__wishlist">TV Shows</button></NavLink>}
                {authContext.user && <NavLink to="/watchlist" activeClassName="nav__linkActive"><button className="nav__wishlist">My List</button></NavLink>}
            </div>
            <div className="nav__right">
                {authContext.user && <button onClick={logoutHandler} className="nav__logout">Logout</button>}    
                {authContext.user && <Avatar className="nav__avatar" src={authContext.user && authContext.user.photoURL} alt={authContext.user.displayName}/>}
            </div>
            
        </div>
    )
}

export default Nav;
