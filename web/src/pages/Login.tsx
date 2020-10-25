import React, { useState, FormEvent, useEffect } from 'react';

import fullLogo from '../images/happyFullLogo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import '../styles/pages/login.css';
import api from '../services/api';

export default function Login() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    function handleToMapPage() {
        history.push('/app')
    }

    async function handleSumbmit(event: FormEvent) {
        event.preventDefault();

        const data = {
            email,
            password
        }

        if(rememberMe) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('email', email as string);
            localStorage.setItem('password', password as string);
        }

        await api.post('/api/user/login', data);

        history.push('/app');
    }

    useEffect(() => {
        if(localStorage.email && localStorage.password) {
            setEmail(localStorage.email);
            setPassword(localStorage.password);
        }
    }, [])


    return (
        <main className="login">
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
                <form onSubmit={handleSumbmit} autoComplete="new-password">
                    <h1>Login</h1>

                    <label htmlFor="email">E-mail</label>
                    <input id="email" value={email} onChange={e => setEmail(e.target.value)} />
                    
                    <label htmlFor="">Password</label>
                    <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <div className="login-options">
                        <div className="remember">
                            <input type="checkbox"  defaultChecked={rememberMe} onChange={() => setRememberMe(!rememberMe)}/>
                            <span className="checkmark"></span>

                            <label>Remember me</label>
                        </div>
                        <p>Forgot my password</p>
                    </div>

                    <button type="submit">
                        Enter
                    </button>
                </form>
            </div>

        </main>
    );
}