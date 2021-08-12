require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Videogame, Genero} = require('../db.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const apiData = await apiUrl.data.results.map(e => {      
        return {
            id: e.id,
            name: e.name,
            img: e.background_image,
            released: e.released,
            rating: e.rating,
            plataform: e.platforms.map(e => e.platform.name)
        }        
    })
    return apiData;
} 


const getDbInfo = async() => {
    const dbData = await Videogame.findAll({
        include:{
            model: Genero,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    return dbData;
}


const getAllGames = async() => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}


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
    const total = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const genresArrays = total.data.results.map(e => e.genres)
    const genresAsStrings = genresArrays.map(e => {
        for(i = 0; i < e.length; i++) {
            return e[i];
        }
    })
    genresAsStrings.forEach(e => {
        Genero.findOrCreate({
            where: {
                id: e.id,
                name: e.name,
                createdInDb: false
            }
        })
    })
    const allGenres = await Genero.findAll();
    res.send(allGenres);
})

router.post('/videogames', async(req, res) => {
    let { name, 
        description, 
        released, 
        rating, 
        img, 
        genres, 
        plataform 
    } = req.body;

    let videogameCreated = await Videogame.create({
        name, 
        description, 
        released, 
        rating, 
        img, 
        plataform
    })
    let genresDb = await Genero.findAll({
        where: {name: genres}
    })
    videogameCreated.addGenero(genresDb)
    res.status(200).send('Videogame creado correctamente')
})

module.exports = router;
