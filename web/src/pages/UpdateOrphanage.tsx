import React, { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory, Redirect, useParams } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FiPlus } from "react-icons/fi";
import mapIcon from "../utils/mapIcon";

import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";
import api from "../services/api";

interface OrphanageParams {
  id: string;
}

interface ImageProps {
  url: string;
}

export default function UpdateOrphanage() {  
  const params = useParams<OrphanageParams>();
  const history = useHistory();

  const [errors, setErrors] = useState<any>();
  const [ showToast, setShowToast ] = useState<boolean>();
  const [ position, setPosition ] = useState({ latitude: 0, longitude: 0})
  const [ name, setName ] = useState('');
  const [ about, setAbout ] = useState('');
  const [ instructions, setInstructions ] = useState('');
  const [ openingHours, setOpeningHours ] = useState('');
  const [ openOnWeekends, setOpenOnWeekends ] = useState(true);
  const [ images, setImages ] = useState<File[]>([]);
  const [ previewImages, setPreviewImages ] = useState<string[]>([]);

  const notify = (message: string) => toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  
  
  useEffect(() => {
    api.get(`/orphanages/${params.id}`).then(res => {
      setName(res.data.name);
      setAbout(res.data.about);
      setInstructions(res.data.instructions);
      setOpeningHours(res.data.opening_hours);
      setOpenOnWeekends(Boolean(res.data.open_on_weekends));
      setPreviewImages(res.data.images.map((image: ImageProps) => image.url));
      setImages(res.data.images.map((image: ImageProps) => image.url));
      setPosition({ latitude: res.data.latitude, longitude: res.data.longitude});
    })
  }, [params.id])

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    })
    setPreviewImages(selectedImagesPreview);
  }

  async function handleSumbmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;
    const user_id = localStorage.user_id

    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', openingHours);
    data.append('open_on_weekends', String(openOnWeekends));
    data.append('user_id', user_id);
    
    images.forEach(image => {
      data.append('images', image);
    })

    await api.put(`/orphanages/id/${params.id}`, data, {
      headers: {
          'auth-token': localStorage.token
        }
      }      
    ).then(() => {
      history.push('/dashboard');
    }).catch(err => {
      setErrors(err.response.data.errors);
      console.log(err.response.data.errors)
      if(showToast) {
          setShowToast(false);
      }
      setShowToast(true);
    });    
  }

  useEffect(() => {
    if(errors) {
      for (var key in errors) {
        if (errors.hasOwnProperty(key)) {
            let message = String(errors[key]).charAt(0).toUpperCase() + String(errors[key]).slice(1);
            let finalMessage = message.replace("_", " ");
            notify(finalMessage);
        }
      }
      setErrors({});
    }
  }, [showToast])


  if(!localStorage.email) {
    return (
      <Redirect to="/auth/login" />
    );
  }

  return (
    <div id="page-create-orphanage">
      <ToastContainer />
      <Sidebar />

      <main>
        <form onSubmit={handleSumbmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>
            <Map 
              center={[position.latitude, position.longitude]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
                <Marker 
                  interactive={false} 
                  icon={mapIcon}
                  position={[position.latitude,position.longitude]} 
                /> 
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">About <span>Max of 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300} 
                value={about}
                onChange={e => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

              {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name}/>
                  )
              })}


                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
                <input multiple onChange={handleSelectImages} type="file" id="image[]"/>

      
            </div>
          </fieldset>

          <fieldset>
            <legend>Visit</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instructions</label>
              <textarea 
                id="instructions" 
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Opening Hours</label>
              <input 
                id="opening_hours" 
                value={openingHours}
                onChange={e => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Open on weekends?</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={openOnWeekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Yes
                </button>
                <button 
                  type="button"
                  className={!openOnWeekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  No
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Update
          </button>
        </form>
      </main>
    </div>
  );
}
