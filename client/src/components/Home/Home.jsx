import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getVideogames, getGenres, filterByOrigin, filterByGenre, orderByName, orderByRating } from '../../actions';

import style from '../Home/Home.module.css'

import Card from '../Card/Card'
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
        
        <div className={style.pos}>
            <div className={style.display}>            
                <Paginado
                cardsPerPage={cardsPerPage}
                allVideogames={allVideogames.length}
                paginado={paginado}
                />
                    <ul className={style.ul}>
                        {
                            currentCards?.map(e => {
                                return(
                                    <li className={style.li}>
                                            <Card name={e.name} img={e.img} genres={e.genres} id= {e.id} createdInDb={e.createdInDb} />                            
                                    </li>
                                )
                            })
                        }
                    </ul>
                <Paginado
                cardsPerPage={cardsPerPage}
                allVideogames={allVideogames.length}
                paginado={paginado}
                />
                
            </div>

            <div className={style.control}>
                <SearchBar />
                <div className={style.row}>
                    <div className={style.col}>
                        <h4 className={style.labels} >Name order</h4>
                        <select className={style.sel} onChange={e => handleAlphaSort(e)}>
                            <option value='asc'>Ascendant</option>
                            <option value='desc'>Descendant</option>
                        </select>
                    </div>
                    <div className={style.col}>
                        <h4 className={style.labels}>Rating order</h4>
                        <select className={style.sel} onChange={e => handleRatingSort(e)}>
                            <option value='rasc'>Ascendant</option>
                            <option value='rdesc'>Descendant</option>
                        </select>
                    </div>
                </div>
                <div  className={style.row}>
                    <div className={style.col}>
                        <h4 className={style.labels}>Filter by genre</h4>
                        <select className={style.sel} onChange={e => handleFilterByGenre(e)}>
                            {
                                genres.map((e) => 
                                <option value={e.name}>{e.name}</option>
                                )
                            }
                        </select>  
                    </div>
                    <div className={style.col}>
                        <h4 className={style.labels}>Filter by origin</h4>
                        <select className={style.sel} onChange={e => handleFilterByOrigin(e)}> 
                            <option value='all'>All</option>
                            <option value='nat'>Native</option>
                            <option value='api'>Api</option>
                        </select>
                    </div>
                </div>
                <div className={style.reload}>
                    <button className={style.button} onClick={e => {handleClick(e)}}>Reload</button>
                </div>
            </div>    
        </div>
    </div>    
    )
}