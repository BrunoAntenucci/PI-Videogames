import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card/Card'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, getGenres, filterByOrigin, filterByGenre, orderByName, orderByRating } from '../../actions';
import Paginado from '../Paginado/Paginado'
import SearchBar from '../SearchBar/SearchBar'
import Nav from '../NavBar/NavBar';



export default function Home(){
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const genres = useSelector((state) => state.genres);


    const [ currentPage, setCurrentPage ] = useState(1);
    const [ cardsPerPage, _setCardsPerPage ] = useState(9);
    const [ _order, setOrder ] = useState('');

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = allVideogames.slice(indexOfFirstCard, indexOfLastCard)
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch])

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }

    function handleFilterByOrigin(e){
        dispatch(filterByOrigin(e.target.value))
    }

    function handleFilterByGenre(e){
        dispatch(filterByGenre(e.target.value))
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
            <Nav/>
            <div>
                <SearchBar />
                <h4>Ordered by name</h4>
                <select onChange={e => handleAlphaSort(e)}>
                    <option value='asc'>Ascendant</option>
                    <option value='desc'>Descendant</option>
                </select>
                <h4>Ordered by rating</h4>
                <select onChange={e => handleRatingSort(e)}>
                    <option value='rasc'>Rating Ascendant</option>
                    <option value='rdesc'>Ratings Descendant</option>
                </select>
                <h4>Filter by orgin</h4>
                <select onChange={e => handleFilterByOrigin(e)}> 
                    <option value='all'>All</option>
                    <option value='nat'>Native</option>
                    <option value='api'>Api</option>
                </select>
                <h4>Filter by genre</h4>
                <select onChange={e => handleFilterByGenre(e)}>
                    {
                        genres.map((e) => 
                        <option value={e.name}>{e.name}</option>
                        )
                    }
                </select>

                <button onClick={e => {handleClick(e)}}>Reload</button>
                <Link to='/creation'>Create Videogame</Link>
            </div>
            <div>

                
                <Paginado
                cardsPerPage={cardsPerPage}
                allVideogames={allVideogames.length}
                paginado={paginado}
                />
                <ul>
                {
                currentCards?.map(e => {
                    return(
                        <li>
                                <Card name={e.name} img={e.img} genres={e.genres} id= {e.id} createdInDB={e.createdInDB}/>                            
                        </li>
                    )
                })
                }
                </ul>
            </div>
    
        </div>

    )


}