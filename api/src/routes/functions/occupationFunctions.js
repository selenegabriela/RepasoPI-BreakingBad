const axios = require('axios');
const { Character, Occupation } = require('../../db');

const getOccupations = () => {
    return axios.get('https://breakingbadapi.com/api/characters')
    .then(characters => characters.data.map(character => character.occupation))
    .then(arraysOccupations => arraysOccupations.map(arrayOccupations => arrayOccupations.map(occupations => {      
        Occupation.findOrCreate({
            where: {
                name: occupations
            },
        });
    })))
    .then(() => {
        return Occupation.findAll()
        .then(occupations => occupations);
    });
}

module.exports = {
    getOccupations,
};