import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            <h1>Bienvenidos a la pagina de Breaking Bad. ¿Quieres meta?</h1>
            <Link to='/home'>
            <button>Sí</button>
            <button>No</button>
            </Link>
        </div>
    )
}