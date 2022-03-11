import { GET_CHARACTERS, GET_OCCUPATIONS, FILTER_CHARACTERS_BY_STATUS, FILTER_DB_OR_API_CHARACTER, ORDER_BY_NAME, GET_CHARACTER, GET_CHARACTER_BY_ID } from "../actions"

const initislState = {
    characters: [],
    allCharacters: [],
    occupations: [],
}

export default function rootReducer(state = initislState, action){
    switch(action.type){
        case GET_CHARACTERS:
            return {
                ...state,
                characters: action.payload,
                allCharacters: action.payload,
            }
        case GET_OCCUPATIONS:
            return {
                ...state,
                occupations: action.payload,
            }
        case GET_CHARACTER:
            return {
                ...state,
                characters: action.payload,
            }
        case GET_CHARACTER_BY_ID:
            return {
                ...state,
                characters: action.payload
            }
        
        case FILTER_CHARACTERS_BY_STATUS:
            const allCharacters = state.allCharacters;
            const filteredCharacters = action.payload === 'All' ? 
                                        allCharacters : 
                                        allCharacters.filter(character => character.status === action.payload);
            return {
                ...state,
                characters: filteredCharacters,
            }
        case FILTER_DB_OR_API_CHARACTER:
            const dbAndApiCharacters = state.allCharacters;
            const filteredDbAndApiCharacters = action.payload === 'all' ?
                                               dbAndApiCharacters :
                                               dbAndApiCharacters.filter(character => {
                                                   if(action.payload === 'created'){
                                                       return character.createdInDb;
                                                   } else {
                                                       return !character.createdInDb;
                                                   }
                                               });
            return {
                ...state,
                characters: filteredDbAndApiCharacters,
            }
        case ORDER_BY_NAME:
            const orderedCharacters = state.characters.sort((a,b) => {
                const firstElement = a.name.toLowerCase();
                const secondElement = b.name.toLowerCase();
                
                if(action.payload === 'asc'){
                    if(firstElement < secondElement) return -1;
                    if(firstElement > secondElement) return 1;
                    return 0;
                }

                if(action.payload === 'desc'){
                    if(firstElement > secondElement) return -1;
                    if(firstElement < secondElement) return 1;
                    return 0;
                }
            })
            console.log(orderedCharacters)
            return {
                ...state,
                characters: orderedCharacters,
                    

            }
        default:
            return {...state}
    }
}