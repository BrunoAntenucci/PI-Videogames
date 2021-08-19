import axios from 'axios';

export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/api/videogames")
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
}

export function filterByOrigin(payload){
    return{
        type: 'FILTER_BY_ORIGIN',
        payload
    }
}

export function filterByGenre(payload){
    return{
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByRating(payload){
    return{
        type: 'ORDER_BY_RATING',
        payload
    }
}

export function searchVideogames(name){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/api/videogames?name=" + name);
            return dispatch({
                type: 'SEARCH_VIDEOGAMES',
                payload: json.data
            })
        }catch(error) {
            console.log(error)
        }
    }
}

export function getGenres(){
    return async function(dispatch) {
        let genres = await axios.get("http://localhost:3001/api/genres", {

        })
        return dispatch({
            type: 'GET_GENRES',
            payload: genres.data
        })
    }
}

export function postVideogame(payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/api/videogames", payload)
        return response;
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/api/videogames/" + id);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        }catch(error){
            console.log(error);
        }                
    }
}