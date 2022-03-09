const express = require('express');
const { Router } = require('express');
const router = Router();

const {
    getOccupations
} = require('./functions/occupationFunctions');

router.get('/', (req, res, next) => {
    getOccupations()
    .then(occupations => res.json(occupations))
    .catch(e => next(e));
});

module.exports = router;