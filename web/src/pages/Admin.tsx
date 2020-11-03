import React, { useState, useEffect } from 'react';
import { FiPower, FiAlertCircle, FiPlus, FiClipboard, FiCheckCircle, FiEdit3 } from 'react-icons/fi';
import { useHistory, Redirect, Link } from 'react-router-dom';
import { HiOutlineLocationMarker} from 'react-icons/hi';
import { Map, Marker, TileLayer } from "react-leaflet";
import { RiDeleteBin7Line } from 'react-icons/ri';
import Modal from 'react-modal';
import api from "../services/api";

import noOrphanageImg from "../images/sadFace.png";
import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from "../utils/mapIcon";

import '../styles/components/Sidebar.css';
import '../styles/pages/Dashboard.css';

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

interface User {
    id: number;
    name: string;
    email: string;
    type: string;
}

Modal.setAppElement('#root');

export default function Admin() {
    const history = useHistory();
    
    // const [ user, setUser ] = useState<User>();
    const [ modalIsOpen, setIsOpen ] = useState(false);
    const [ modelType, setModalType ] = useState('');
    const [ orphanage ,setOrphanage ] = useState<Orphanage>();
    const [ orphanages, setOrphanages ] = useState([]);
    const [ waitingOrphanages, setWaitingOrphanages ] = useState([]);
    
    useEffect(() => {
        api.get('/orphanages/admin', {
            headers: {
                'auth-token': localStorage.token
              }
            }).then(res => {
            setOrphanages(res.data);
            setWaitingOrphanages(res.data);
        })
    }, [])

    function openModal(orphanage: Orphanage, type: string) {
        setModalType(type);
        setOrphanage(orphanage);
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    function handleToDashboard() {
        history.push('/dashboard');
    }
    
    function handleDelete() {
        if(orphanage) {
            api.delete(`/orphanages/id/${orphanage.id}`, {
                headers: {
                    'auth-token': localStorage.token
                  }
            });
            history.push('/orphanages/orphanage-deleted');
        }
    }      
    
    function handleApproved() {
        if(orphanage) {
            api.put(`/orphanages/approved/${orphanage.id}`);
        }
    }   

    function handleToMapPage() {
        history.push('/app');
    }

    function handleToAddOrphanage() {
        history.push('/orphanages/create');
    }

    function handleToWaitingOrphanage() {
        history.push('/dashboard/waiting');
    }

    function handleToOrphanageDetail() {
        if(orphanage) {
            history.push(`/orphanages/${orphanage.id}`);
        }
    }
        
    function handleToApproval() {
        history.push('/orphanages/admin');
    }

    function logOff(){
        localStorage.clear();
        history.push('/app');
    }

    if(!localStorage.email) {
        return (
          <Redirect to="/auth/login" />
        );
      }   

    return(
        <main>
            {orphanage && modelType === "delete" && (
                <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="Modal"
                overlayClassName="Overlay"
            >
                <header>
                    <h2>Do you want to delete the orphanage: </h2>
                    <button onClick={closeModal}>X</button>
                </header>

                <h3>{orphanage.name}</h3>
                <form>
                    <button>No</button>
                    <button onClick={handleDelete}>Yes</button>
                </form>
            </Modal>
            )}

            {orphanage && modelType === "approve" && (
                <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="Modal"
                overlayClassName="Overlay"
            >
                <header>
                    <h2>Do you want to approve the orphanage: </h2>
                    <button onClick={closeModal}>X</button>
                </header>

                <h3>{orphanage.name}</h3>
                <form>
                    <button>No</button>
                    <button onClick={handleApproved}>Yes</button>
                </form>
            </Modal>
            )}

            <aside className="app-sidebar">
                <img src={mapMarkerImg} alt="Happy" />
                <div className="middle-icon">
                    <button type="button" className="location-icon" onClick={handleToMapPage}>
                        <HiOutlineLocationMarker size={28} color="#0089A5" />
                    </button>

                    <button type="button" className="add-orphanage-icon" onClick={handleToAddOrphanage}>
                        <FiPlus size={28} color="#FFF" />
                    </button>

                    {localStorage.type === "admin" && (
                        <button type="button" className="add-orphanage-icon active" onClick={handleToApproval}>
                            <FiCheckCircle size={24} color="#FFF" />
                        </button>
                    )}
                                        
                    <button type="button" className="add-orphanage-icon" onClick={handleToDashboard}>
                        <FiClipboard size={24} color="#FFF" />
                    </button>
                    
                    {localStorage.type !== "admin" && (
                    <button type="button" onClick={handleToWaitingOrphanage}>
                        <FiAlertCircle size={24} color="#FFF" />
                        {waitingOrphanages.length > 0 && 
                            <div className="alert"></div>
                        }
                    </button>
                    ) }

                </div>
                <footer>
                    <button type="button" onClick={logOff}>
                        <FiPower size={24} color="#FFF" />
                    </button>
                </footer> 
            </aside>

            <div className="dashboard">
                <div className="head">
                    <h1>Orphanages to be approved</h1>
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
                                    <Link className="button" to={`/orphanages/${orphanage.id}`}>
                                        <h3 onClick={handleToOrphanageDetail}>{orphanage.name}</h3>
                                    </Link>
                                    <div className="edit">

                                        <Link className="button" to={`/orphanages/id/${orphanage.id}`}>
                                            <FiEdit3 size={28} color="#15C3D6" />
                                        </Link>
                                        <Link className="button" to={'/orphanages/admin'} onClick={() => openModal(orphanage, "approve")}>
                                            <FiCheckCircle size={28} color="#15C3D6" />
                                        </Link>
                                        
                                        <Link className="button" to={'/orphanages/admin'} onClick={() => openModal(orphanage, "delete")}>
                                            <RiDeleteBin7Line size={28} color="#15C3D6" />
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