require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const {Videogame, Genre} = require('../db.js')


const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const apiData = await apiUrl.data.results.map(e => {      
        return {
            id: e.id,
            name: e.name,
            img: e.background_image,
            released: e.released,
            rating: e.rating,
            genres: e.genres.map(e => e.name),
            plataform: e.platforms.map(e => e.platform.name)
        }        
    })
    return apiData;
}


const getDbInfo = async() => {
    const dbData = await Videogame.findAll({
        include:{
            model: Genre,
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

module.exports = getAllGames