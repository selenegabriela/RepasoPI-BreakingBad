import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { create_character, get_occupations } from "../actions";

export default function CreateCharacter(){

    const dispatch = useDispatch();
    const occupations = useSelector(state => state.occupations);

    const [ input, setInput ] = useState({
        name: '',
        nickname: '',
        birthday: '',
        img: '',
        status: '',
        occupation: [],
    })

    useEffect(() => {
        dispatch(get_occupations());
        
    }, []);
    

    return(
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Creat tu personaje</h1>
            <form>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={input.name} name='name' />
                </div>
                <div>
                    <label>Nickname:</label>
                    <input type="text" value={input.nickname} name='nickname' />
                </div>
                <div>
                    <label>Cumpleaños:</label>
                    <input type="text" value={input.birthday} name='birthday' />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input type="text" value={input.img} name='img' />
                </div>
                <div>
                    <label>Status:</label>
                    <label><input type="checkbox" value='Alive' name='Alive' />Alive</label>
                    <label><input type="checkbox" value='Deseaced' name='Deseaced' />Deseaced</label>
                    <label><input type="checkbox" value='Unknown' name='Unknown' />Unknown</label>
                    <label><input type="checkbox" value='Presumed dead' name='Presumed dead' />Presumed dead</label>    
                </div> 
                
                    <select>  
                        {
                            occupations && occupations.map(occupation => {
                                
                                return <option key={occupation.id} value={occupation.name}>{occupation.name}</option>
                            })
                        }
                    </select>
                
            </form>
        </div>
    )
}