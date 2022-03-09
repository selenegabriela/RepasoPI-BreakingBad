const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const charactersRoutes = require('./characters')
const occupationsRoutes = require('./occupations')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/characters', charactersRoutes);
router.use('/occupations', occupationsRoutes);


module.exports = router;
