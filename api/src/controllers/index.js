require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const {Videogame, Genre} = require('../db.js')

var apiData =[];

const getApiInfo = async (url) => {
    if(apiData.length < 100){ 
        const apiUrl = await axios.get(url);
        apiData =  apiData.concat(apiUrl.data.results.map(e => {      
            return {
                id: e.id,
                name: e.name,
                img: e.background_image,
                released: e.released,
                rating: e.rating,
                genres: e.genres.map(e => e.name),
                plataform: e.platforms.map(e => e.platform.name)
            }        
        }))
        
        return apiData.concat(getApiInfo(apiUrl.data.next)) 
    }else{
        return apiData;
    }
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
    const apiInfo = await getApiInfo(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}

module.exports = getAllGames