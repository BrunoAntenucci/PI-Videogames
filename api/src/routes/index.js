require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const getAllGames = require('../controllers/index')
const {Videogame, Genre} = require('../db.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', async(req, res) => {
    const name = req.query.name;
    let total = await getAllGames();
    if(name) {
        let filtered = await total.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        filtered.length ? 
        res.status(200).send(filtered) :
        res.status(404).send('No se encontro el juego') 
    }else{
        res.status(200).send(total)
    }

})

router.get('/genres', async(req, res) => {
    const total = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genresArrays = total.data.results.map(e => e.name)
    //const genresAsObjects = genresArrays.flat(5)
    
    genresArrays.forEach(e => {
        Genre.findOrCreate({
            where: {
                name: e,
                createdInDb: false
            }
        })
    })

    const allGenres = await Genre.findAll();
    res.send(allGenres);
})

router.post('/videogames', async(req, res) => {
    let { name, 
        description, 
        released, 
        rating,
        genres, 
        img, 
        plataform 
    } = req.body;

    genres.forEach(e => {
        Genre.findOrCreate({
            where: {
                name: e,
            }
        })
    })

    let videogameCreated = await Videogame.create({
        name, 
        description, 
        released, 
        rating, 
        img,
        genres, 
        plataform
    })

    genres.forEach(e => {
        Genre.findOrCreate({
            where: {
                name: e,
            }
        })
    })

    let genresDb = await Genre.findAll({
        where: {
            name: genres.map(e => e)
        }
    })

    videogameCreated.addGenre(genresDb)
    res.send('Videogame creado correctamente')
})

router.get('/videogames/:id', async (req, res) => {
    const id = req.params.id;
    const totalGames = await getAllGames();
    if(id){
        let gameId = await totalGames.filter(e => e.id == id)
        gameId.length ?
        res.status(200).json(gameId):
        res.status(404).send('Videogame no encontrado');      
    }
})

module.exports = router;
