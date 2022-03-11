
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_characters, filter_characters_by_status, filter_db_or_api_character, order_by_name } from '../actions/index';
import { Link } from 'react-router-dom'
import Card from './Card';
import Paginated from './Paginated';
import SearchBar from './SearchBar';

export default function Home(){

    const allCharacters = useSelector(state => state.characters);
    const dispatch = useDispatch();

    const [ order, setOrder ] = useState('');
    const [ currentPage, setCurrentPage ] = useState(1); // 2
    const [ charactersPerPage, setCharactersPerPage ] = useState(6); // 6
    const indexOfLastCharacter = currentPage * charactersPerPage; // 6
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage; // 0
    const currentCharacters = allCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        
        dispatch(get_characters());
        
    }, [dispatch]);
    
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(get_characters());
    }

    const handleStatus = (e) => {
        e.preventDefault(e);
        dispatch(filter_characters_by_status(e.target.value));
    }

    const handleDbOrApi = (e) => {
        e.preventDefault(e);
        dispatch(filter_db_or_api_character(e.target.value));
    }

    const handleOrderByName = (e) => {
        e.preventDefault(e);
        dispatch(order_by_name(e.target.value));
        setCurrentPage(1);
        setOrder(`Orden ${e.target.value}`);
    }

    return(
        <div>
            <Link to='/character'>Crear personaje</Link>
            <h1>Breaking Bad</h1>
            <button onClick={e => handleClick(e)}>Cargar los personajes de nuevo</button>

            <div>
                <select onChange={(e) => handleOrderByName(e)}>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select onChange={e => handleStatus(e)}>
                    <option value="All">Todos</option>
                    <option value="Alive">Vivo</option>
                    <option value="Deceased">Muerto</option>
                    <option value="Presumed dead">Presuntamente muerto</option>
                    <option value="Unknown">Desconocido</option>
                </select>
                <select onChange={e => handleDbOrApi(e)}>
                    <option value="all">Todos</option>
                    <option value="created">Creados por mí</option>
                    <option value="api">Existentes</option> 
                </select>
            <SearchBar />
            <Paginated allCharacters={allCharacters.length} charactersPerPage={charactersPerPage} paginated={paginated}/>
            </div>
            {
                currentCharacters && currentCharacters.map(character => (<Card name={character.name} nickname={character.nickname} image={character.img} key={character.id}/>))
            }

        </div>
    )
}