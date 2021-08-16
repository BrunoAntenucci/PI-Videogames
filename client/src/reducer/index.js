
const initialState = {
    videogames : [],
    allVideogames: [],
    genres: [],
    detail: []
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
            }
        case 'FILTER_BY_ORIGIN':
            const allGames = state.allVideogames;
            const filtered = action.payload === "nat" ? allGames.filter(e => e.createdInDb === true) : allGames.filter(e => !e.createdInDb) 
            
            return {
                ...state,
                videogames: action.payload === 'all' ? allGames : filtered
            }
        case 'ORDER_BY_NAME':
            let sortedAlpha = action.payload === 'asc' ?
            state.videogames.sort(function(a, b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) : 
            state.videogames.sort(function(a, b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            }) 
            return {
                ...state,
                videogames: sortedAlpha
            }
        case 'ORDER_BY_RATING':
            let sortedRating = action.payload === 'rasc' ?
            state.videogames.sort(function(a, b){
                if(a.rating > b.rating){
                    return 1;
                }
                if(b.rating > a.rating){
                    return -1;
                }
                return 0;
            }) : 
            state.videogames.sort(function(a, b){
                if(a.rating > b.rating){
                    return -1;
                }
                if(b.rating > a.rating){
                    return 1;
                }
                return 0;
            }) 
            return {
                ...state,
                videogames: sortedRating
            }
        case 'SEARCH_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload
            }
        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            }
        case 'POST_VIDEOGAME':
            return{
                ...state
            }
        case 'GET_DETAIL':
            return{
                ...state,
                detail: action.payload
            }                        
        default:
            return state;    
    }

}

export default rootReducer;