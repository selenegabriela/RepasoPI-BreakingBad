import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { get_character } from "../actions";

export default function SearchBar(){

    const [ name, setName ] = useState('');
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name)
        dispatch(get_character(name));
        setName('');
    }

    return(
        <div>
            <input value={name} type="text" placeholder="Buscar personaje..." onChange={(e) => handleInputChange(e)} />
            <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )

}