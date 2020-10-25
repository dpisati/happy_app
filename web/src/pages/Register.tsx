import React from 'react';

import fullLogo from '../images/happyFullLogo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/pages/login.css';
import { useHistory } from 'react-router-dom';

export default function Register() {
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
                    <button onClick={handleToMapPage}>
                        <FiArrowLeft size={20} color="15C3D6"/>
                    </button>
                </header>
                <form action="">
                    <h1>Register</h1>

                    <label htmlFor="">Name</label>
                    <input type="text"/>
                    
                    <label htmlFor="">E-mail</label>
                    <input type="text"/>
                    
                    <label htmlFor="">Password</label>
                    <input type="text"/>

                    <button>
                        Register
                    </button>
                </form>
            </div>

        </main>
    );
}