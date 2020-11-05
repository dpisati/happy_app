import React from 'react';
import { useHistory } from 'react-router-dom';

import happyGirl from '../images/happyGirl.svg';

import '../styles/pages/orphanage-created.css';
 
export default function OrphanageCreated() {
    const history = useHistory();

    function handleToMapPage() {
        history.push('/app')
    }

    return (
        <div className="container-created">
            <div className="hero">
                <div className="left">
                    <h1>Yaaaay!</h1>
                    <p>Your register is created successfully! Now kids will be waiting for you</p>
                    <button className="confirm-button-created" type="submit" onClick={handleToMapPage}>
                        Back to map
                    </button>
                </div>
                <div className="right">
                    <img src={happyGirl} alt="Happy Girl"/>
                </div>
            </div>
        </div>
    )
}
