import React, { useState, useEffect } from 'react';
import { FiPower, FiAlertCircle, FiEdit3,  } from 'react-icons/fi';
import { HiOutlineLocationMarker} from 'react-icons/hi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { useHistory, Redirect, Link } from 'react-router-dom';
import { Map, Marker, TileLayer } from "react-leaflet";
import api from "../services/api";

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from "../utils/mapIcon";
import noOrphanageImg from "../images/sadFace.png";

import '../styles/components/Sidebar.css';
import '../styles/pages/Dashboard.css';

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export default function Dashborad() {
    const { goBack } = useHistory();
    const history = useHistory();

    const [orphanages, setOrphanages] = useState([]);

    useEffect(() => {
        api.get(`/orphanages/user/${localStorage.user_id}`).then(res => {
            setOrphanages(res.data);
        })
    }, [])

    function logOff(){
        localStorage.clear();
        history.push('/app');
    }

    function handleToMapPage() {
        history.push('/app')
    }

    if(!localStorage.email) {
        return (
          <Redirect to="/auth/login" />
        );
      }   

    return(
        <main>
            <aside className="app-sidebar">
                <img src={mapMarkerImg} alt="Happy" />
                <div className="middle-icon">
                    <button type="button" className="location-icon" onClick={handleToMapPage}>
                        <HiOutlineLocationMarker size={28} color="#0089A5" />
                    </button>

                    <button type="button" onClick={goBack}>
                        <FiAlertCircle size={24} color="#FFF" />
                        <div className="alert"></div>
                    </button>
                </div>
                <footer>
                    <button type="button" onClick={logOff}>
                        <FiPower size={24} color="#FFF" />
                    </button>
                </footer> 
            </aside>

            <div className="dashboard">
                <div className="head">
                    <h1>Registered Orphanages</h1>
                    {orphanages.length > 0 && <h2>{orphanages.length} Orphanages found</h2>}
                </div>

                <div className="orphanages">

                    {orphanages.length === 0 && 
                        <div className="no-orphanages">
                            <img src={noOrphanageImg} alt="No orphanages"/>
                        </div>
                    }

                    

                    {orphanages.map((orphanage: Orphanage) => (
                            <div className="map-container-user" key={orphanage.id}>
                                <Map 
                                    center={[orphanage.latitude , orphanage.longitude]} 
                                    zoom={16} 
                                    style={{ width: '100%', height: 280 }}
                                    dragging={false}
                                    touchZoom={false}
                                    zoomControl={false}
                                    scrollWheelZoom={false}
                                    doubleClickZoom={false}
                                >
                                    <TileLayer 
                                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                    />
                                    <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude , orphanage.longitude]} />
                                </Map>
                                <footer>
                                    <h3>{orphanage.name}</h3>
                                    <div className="edit">
                                        <Link className="button" to={`/orphanages/id/${orphanage.id}`}>
                                            <FiEdit3 size={28} color="#15C3D6" />
                                        </Link>
                                        <Link className="button" to={"/"}>
                                            <RiDeleteBin7Line size={28} color="#15C3D6"/>
                                        </Link>
                                    </div>
                                </footer>
                            </div>
                    ))}
                    

                </div>
            </div>
        </main>
    );
}