import axios from 'axios';
export const GET_CHARACTERS = 'GET_CHARACTERS';
export const GET_CHARACTER = 'GET_CHARACTER';
export const GET_OCCUPATIONS = 'GET_OCCUPATIONS';
export const FILTER_CHARACTERS_BY_STATUS = 'FILTER_CHARACTERS_BY_STATUS';
export const FILTER_DB_OR_API_CHARACTER = 'FILTER_DB_OR_API_CHARACTER';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const GET_CHARACTER_BY_ID = 'GET_CHARACTERS_BY_ID';


export const get_characters = () => {
    return function(dispatch){
        axios.get('http://localhost:3001/api/characters/')
        .then(characters => {
            return dispatch({type: GET_CHARACTERS, payload: characters.data})
        })
    }
}

export const get_occupations = () => {
    return function(dispatch){
        axios.get('http://localhost:3001/api/occupations/')
        .then(occupations => {
            return dispatch({type: GET_OCCUPATIONS, payload: occupations.data})
        })
    }
}

export const get_character = (name) => {
    return function(dispatch){
        axios.get(`http://localhost:3001/api/characters/?name=${name}`)
        .then(character => {
            return dispatch({type: GET_CHARACTER, payload: character.data})
        })
    }
}

export const get_character_by_id = (id) => {
    return function(dispatch){
        axios.get(`http://localhost:3001/api/characters/${id}`)
        .then(character => {
            return dispatch({type: GET_CHARACTER_BY_ID, payload: character.data})
        })
    }
}

export const create_character = (payload) => {
    return function(dispatch){
        axios.post('http://localhost:3001/api/characters/', payload)
        .then(data => data)
    }
}

export const filter_characters_by_status = (status) => {
    return {
        type: FILTER_CHARACTERS_BY_STATUS,
        payload: status,
    }
}

export const filter_db_or_api_character = (value) => {
    return {
        type: FILTER_DB_OR_API_CHARACTER,
        payload: value,
    }
}

export const order_by_name = (value) => {
    return {
        type: ORDER_BY_NAME,
        payload: value,
    }
}