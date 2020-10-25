import React from 'react';
import { FiPower, FiAlertCircle, FiEdit3,  } from 'react-icons/fi';
import { HiOutlineLocationMarker} from 'react-icons/hi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { useHistory, Redirect } from 'react-router-dom';
import { Map, Marker, TileLayer } from "react-leaflet";
// import api from "../services/api";

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from "../utils/mapIcon";

import '../styles/components/Sidebar.css';
import '../styles/pages/Dashboard.css';

export default function Dashborad() {
    const { goBack } = useHistory();
    const history = useHistory();

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
                    <h2>6 Orphanages found</h2>
                </div>

                <div className="orphanages">
                    <div className="map-container">
                        <Map 
                            center={[-43.5314368 , 172.6346739]} 
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
                            <Marker interactive={false} icon={mapIcon} position={[-43.5314368 , 172.6346739]} />
                        </Map>
                        <footer>
                            <h3>New Orphanage</h3>
                            <div className="edit">
                                <button>
                                    <FiEdit3 size={28} color="#15C3D6" />
                                </button>
                                <button>
                                    <RiDeleteBin7Line size={28} color="#15C3D6"/>
                                </button>
                            </div>
                        </footer>
                    </div>


                    <div className="map-container">
                        <Map 
                            center={[-43.5314368 , 172.6346739]} 
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
                            <Marker interactive={false} icon={mapIcon} position={[-43.5314368 , 172.6346739]} />
                        </Map>
                        <footer>
                            <h3>New Orphanage</h3>
                            <div className="edit">
                                <button>
                                    <FiEdit3 size={28} color="#15C3D6" />
                                </button>
                                <button>
                                    <RiDeleteBin7Line size={28} color="#15C3D6"/>
                                </button>
                            </div>
                        </footer>
                    </div>
                    <div className="map-container">
                        <Map 
                            center={[-43.5314368 , 172.6346739]} 
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
                            <Marker interactive={false} icon={mapIcon} position={[-43.5314368 , 172.6346739]} />
                        </Map>
                        <footer>
                            <h3>New Orphanage</h3>
                            <div className="edit">
                                <button>
                                    <FiEdit3 size={28} color="#15C3D6" />
                                </button>
                                <button onClick={logOff}>
                                    <RiDeleteBin7Line size={28} color="#15C3D6"/>
                                </button>
                            </div>
                        </footer>
                    </div>
                    <div className="map-container">
                        <Map 
                            center={[-43.5314368 , 172.6346739]} 
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
                            <Marker interactive={false} icon={mapIcon} position={[-43.5314368 , 172.6346739]} />
                        </Map>
                        <footer>
                            <h3>New Orphanage</h3>
                            <div className="edit">
                                <button>
                                    <FiEdit3 size={28} color="#15C3D6" />
                                </button>
                                <button>
                                    <RiDeleteBin7Line size={28} color="#15C3D6"/>
                                </button>
                            </div>
                        </footer>
                    </div>





                </div>
            </div>
        </main>
    );
}