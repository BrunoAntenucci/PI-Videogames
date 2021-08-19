import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions';
import { useEffect } from 'react';


export default function Detail(props){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch, props.match.params.id]);

    const selectedVideogame = useSelector((state) => state.detail)

    return(
        <div>
            {
                selectedVideogame.length > 0? 
                    <div>
                        <h1>{selectedVideogame[0].name}</h1>
                        <img src={selectedVideogame[0].img} alt="Image not found" width="350px" height="200px"/>
                        <h4>Description: {selectedVideogame[0].description ? selectedVideogame[0].description : "No description"}</h4>
                        <h4>Release date: {selectedVideogame[0].released ? selectedVideogame[0].released : "No data"}</h4>
                        <h4>Rating: {selectedVideogame[0].rating ? selectedVideogame[0].rating : "No data"}</h4>
                        <h4>Platforms</h4>
                        <ul>{selectedVideogame[0].plataform ? selectedVideogame[0].plataform.map((e) => <li>{e} </li>) : "No data"}</ul>
                        <h4>Genres</h4>
                        <ul>{selectedVideogame[0].createdInDb === true ? selectedVideogame[0].genres.map((e) => <li>{e.name}</li>) : selectedVideogame[0].genres.map((e) => <li>{e}</li>) }</ul>
                    </div>
                : <h1>Not found</h1>

            }
                <Link to='/home'>
                    <button>Back</button>
                </Link>    
        </div>
    )
} 