const axios = require('axios');
const { Character, Occupation } = require('../../db');


const getApiCharacters = () => {
    return axios.get('https://breakingbadapi.com/api/characters')
    .then(characters => characters.data);
}
const getDbCharacters = () => {
    return Character.findAll({
        include: {
            model: Occupation,
            attributes: ['name'],
                through: {
                    attributes: [],
                }
        }
    })
    .then(characters => characters);
}
const getAllCharacters = () => {
    const apiCharacters = getApiCharacters();
    const dbCharacters = getDbCharacters();

    return Promise.all([apiCharacters, dbCharacters])
    .then(promise => {
        let [ api, db ] = promise;
        api = api.map(character => {
            return {
                id: character.char_id,
                name: character.name,
                nickname: character.nickname,
                img: character.img,
                birthday: character.birthday,
                status: character.status,
                occupation: character.occupation.map(occ => occ),
                appearance: character.appearance.map(app => app),
            }
        })
        const allCharacters = [...api, ...db];
        return allCharacters;
    });
}
const getCharacterById = (data) => {
    const { id } = data;

    return getAllCharacters()
    .then(characters => characters.filter(character => character.id.toString() === id))
    .then(character => character);
}
const createCharacter = (data) => {
    const { name, nickname, image, status, createdInDb, occupation, birthday } = data;
    let createdCharacter = Character.create({
        name,
        nickname,
        image,
        birthday,
        status,
        createdInDb,
    });
    const occupationsDb = Occupation.findAll({
        where: {
            name: occupation
        }
    });

    return Promise.all([createdCharacter, occupationsDb])
    .then(promise => {
        let [ character, occupations ] = promise;
        return character.addOccupation(occupations)
        .then(() => 'Personaje creado con éxito');
    });   
}

    module.exports = {
        getApiCharacters,
        getDbCharacters,
        getAllCharacters,
        getCharacterById,
        createCharacter,
    }
