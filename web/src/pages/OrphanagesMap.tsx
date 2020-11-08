import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight, FiBookOpen } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapIcon from "../utils/mapIcon";
import mapMarkerImg from '../../src/images/map-marker.svg';
import api from '../services/api';

import '../styles/pages/orphanages-map.css';
import 'leaflet/dist/leaflet.css';

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState([]);

    useEffect(() => {
        api.get('/orphanages').then(res => {
            setOrphanages(res.data);
        })
    }, [])

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Marker" />

                    <h2>Chose one orphanage on map</h2>
                    <p>Many kids are waiting for you to come :-)</p>
                </header>

                <footer>
                    <strong>Christchurch</strong>
                    <span>Canterbury</span>
                </footer>
            </aside>
            
                <Map 
                    center={[-43.5307744,172.6314044]}
                    zoom={13}
                    style={{ 
                        width: '100%',
                        height: '100%'
                     }}                
                >
                    <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                     {orphanages.map((orphanage: Orphanage) => (
                        <Marker
                            key={orphanage.id}
                            icon={mapIcon}
                            position={[orphanage.latitude, orphanage.longitude]}>
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="FFF"/>
                                </Link>
                            </Popup>
                        </Marker>
                     ))}

                </Map>

                <Link to="/orphanages/create" className="create-orphanage">
                    <FiPlus size={32} color="#FFF"/>
                </Link>
                <Link to="/dashboard" className="dashboard-icon">
                    <FiBookOpen size={32} color="#FFF"/>
                </Link>

        </div>
    )
}

export default OrphanagesMap;