import React from 'react';

import fullLogo from '../images/happyFullLogo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/pages/login.css';
import { useHistory } from 'react-router-dom';

export default function Login() {
    const history = useHistory();

    function handleToMapPage() {
        history.push('/app')
    }

    return (
        <main>
            <div className="left">
                <div className="left-content">
                    <img src={fullLogo} alt="Happy Face"/>
                    <h1>Christchurch</h1>
                    <h2>Canterbury</h2>
                </div>
            </div>

            <div className="right">
                <header>
                    <button  onClick={handleToMapPage}>
                        <FiArrowLeft size={20} color="15C3D6"/>
                    </button>
                </header>
                <form action="">
                    <h1>Login</h1>

                    <label htmlFor="">E-mail</label>
                    <input type="text"/>
                    
                    <label htmlFor="">Password</label>
                    <input type="text"/>

                    <div className="login-options">
                        <div className="remember">
                            <input type="checkbox"/>
                            <span className="checkmark"></span>

                            <label htmlFor="">Remember me</label>
                        </div>
                        <p>Forgot my password</p>
                    </div>

                    <button>
                        Enter
                    </button>
                </form>
            </div>

        </main>
    );
}