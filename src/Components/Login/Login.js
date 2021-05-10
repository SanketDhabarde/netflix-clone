import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';
import Nav from '../Nav/Nav';
import './Login.css';

function Login() {
    const authContext = useContext(AuthContext);

    const loginHandler = () => {
        authContext.login();
    }
    return (
        <div className="login">
            <div className="login__headerFaded">
                <Nav/>
            </div>
            <div className="login__contents">
                <h1 className="login__contentsTitle">Unlimited movies, TV shows and more</h1>
                <h2 className="login__subtitles">Watch anywhere. Cancel anytime.</h2>
                <h3 className="login__title">Ready to watch? login with Google.</h3>
                <button className="login__button" onClick={loginHandler}><span><img className="google__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png"/></span>Login with Google</button>
              
            </div>
            <div className="login__footerFaded"></div>
        </div>
    )
}

export default Login;
