import React, { useState, FormEvent } from 'react';

import fullLogo from '../images/happyFullLogo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/pages/login.css';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleToMapPage() {
        history.push('/app')
    }

    async function handleSumbmit(event: FormEvent) {
        event.preventDefault();

        const data = {
            name,
            email,
            password
        }

        await api.post('/api/user/register', data);

        history.push('/app');
    }

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
                    <button onClick={handleToMapPage}>
                        <FiArrowLeft size={20} color="15C3D6"/>
                    </button>
                </header>
                <form onSubmit={handleSumbmit}>
                    <h1>Register</h1>

                    <label htmlFor="name">Name</label>
                    <input id="name" value={name} onChange={e => setName(e.target.value)} />
                    
                    <label htmlFor="email">E-mail</label>
                    <input id="email" value={email} onChange={e => setEmail(e.target.value)} />
                    
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <button type="submit">
                        Register
                    </button>
                </form>
            </div>

        </main>
    );
}