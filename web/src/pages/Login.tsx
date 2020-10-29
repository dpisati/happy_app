import React, { useState, FormEvent, useEffect } from 'react';

import fullLogo from '../images/happyFullLogo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/pages/login.css';
import api from '../services/api';

toast.configure();

export default function Login() {
    const history = useHistory();
    const notify = () => toast.error('Wrong E-mail or Password', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    const [showToast, setShowToast] = useState<boolean>();
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
            password,
        }

        if(rememberMe) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('email', email as string);
            localStorage.setItem('password', password as string);
        }
        localStorage.setItem('email', email as string);
        
        await api.post('/api/user/login', data).then((res) => {
            localStorage.setItem('token', res.data.user.token);
            localStorage.setItem('user_id', res.data.user.id);
            
            history.push('/dashboard');
        }).catch((err) => {
            console.log(err.response.data); // get the response
            // console.log(err.response.status); // status code of the request
            if(showToast) {
                setShowToast(false);
            }
            setShowToast(true);
        });
    }

    useEffect(() => {
        if(localStorage.password) {
            setEmail(localStorage.email);
            setPassword(localStorage.password);
        }
    }, [])

    useEffect(() => {
        if(showToast) {
            notify();
        }        
    }, [showToast])


    return (
        <main className="login">
             <ToastContainer />
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
                <form className="login-form" onSubmit={handleSumbmit} autoComplete="new-password">
                    <div className="orRegister">
                        <h1>Login</h1>
                        <Link to="/auth/register" className="register">
                            Register
                        </Link>
                    </div>

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