import { Avatar} from '@material-ui/core';
import React, { useState, useEffect, useContext} from 'react';
import { AuthContext } from '../../context/auth-context';
import './Nav.css';
import { Link, useHistory } from 'react-router-dom';

function Nav() {
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
            <div className="nav__right">
                {authContext.user && <Link to="/watchlist"><button className="nav__wishlist">WishList</button></Link>}  
                {authContext.user && <button onClick={logoutHandler} className="nav__logout">Logout</button>}    
                {authContext.user && <Avatar className="nav__avatar" src={authContext.user && authContext.user.photoURL} alt={authContext.user.displayName}/>}
            </div>
            
        </div>
    )
}

export default Nav;
