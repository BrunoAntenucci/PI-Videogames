import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterByOrigin, orderByName, orderByRating } from '../actions';
import { Fragment } from 'react';
import Paginado from './Paginado';
import SearchBar from './SearchBar';



export default function Home(){
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);

    const [ currentPage, setCurrentPage ] = useState(1);
    const [ cardsPerPage, _setCardsPerPage ] = useState(9);
    const [ order, setOrder ] = useState('');

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = allVideogames.slice(indexOfFirstCard, indexOfLastCard)
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }

    function handleFilterByOrigin(e){
        dispatch(filterByOrigin(e.target.value))
    }

    function handleAlphaSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleRatingSort(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    return(
        <div>
            <Link to='/creation'>Crear Videogame</Link>
            <button onClick={e => {handleClick(e)}}>
                Reload
            </button>
            <div>
                <select onChange={e => handleAlphaSort(e)}>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select onChange={e => handleRatingSort(e)}>
                    <option value='rasc'>Rating Ascendente</option>
                    <option value='rdesc'>Ratings Descendente</option>
                </select>
                <select onChange={e => handleFilterByOrigin(e)}> 
                    <option value='all'>All</option>
                    <option value='nat'>Nativo</option>
                    <option value='api'>Api</option>
                </select>
                <SearchBar />
                <Paginado
                cardsPerPage={cardsPerPage}
                allVideogames={allVideogames.length}
                paginado={paginado}
                />
                {
                currentCards?.map(e => {
                    return(
                        <div>
                            <Link to={"/home/" + e.id}>
                                <Card name={e.name} img={e.img} />
                            </Link>
                        </div>
                    )
                })
                }
            </div>    
        </div>

    )


}