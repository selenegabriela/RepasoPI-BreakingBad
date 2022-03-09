const express = require('express');
const { Router } = require('express');
const router = Router();

const { 
    getApiCharacters, 
    getDbCharacters, 
    getAllCharacters,
    getCharacterById,
    createCharacter,
} = require('./functions/charactersFunctions');

router.get('/', (req, res, next) => {
    const { name } = req.query;

    if(name){
        getAllCharacters()
        .then(characters => {
            return characters.filter(character => character.name.toLowerCase().includes(name.toLocaleLowerCase()));
        })
        .then(character => res.json(character))
        .catch(e => next(e));
    } else {
        getAllCharacters()
        .then(characters => res.json(characters))
        .catch(e => next(e));
    }
});

router.get('/:id', (req, res, next) => {
    getCharacterById(req.params)
    .then(character => {
        if(character.length) res.json(character);
        else res.status(404).json('Personaje no encontrado');
    })
    .catch(e => next(e));
});

router.post('/', (req, res, next) => {
    
    createCharacter(req.body)
    .then((success) => res.json(success))
    .catch(e => next(e));

});


module.exports = router;