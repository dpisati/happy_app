import React from 'react';
import { useHistory } from 'react-router-dom';

import sadKid from '../images/sadKid.svg';

import '../styles/pages/orphanage-deleted.css';
 
export default function OrphanageDeleted() {
    const history = useHistory();

    function handleToMapPage() {
        history.push('/app')
    }

    return (
        <div className="container">
            <div className="hero">
                <div className="left">
                    <h1>Deleted!</h1>
                    <p>The orphanage has been deleted!</p>
                    <button className="confirm-button" type="submit" onClick={handleToMapPage}>
                        Back to map
                    </button>
                </div>
                <div className="right">
                    <img src={sadKid} alt="Happy Girl"/>
                </div>
            </div>
        </div>
    )
}
