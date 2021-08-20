import React from "react";
import style from '../Paginado/Paginado.module.css'

export default function Paginado({cardsPerPage, allVideogames, paginado}){
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allVideogames/cardsPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    return(
        <nav>
            <ul className={style.ul}>
                { pageNumbers && 
                    pageNumbers.map(number => (
                    <li className={style.li} key={number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                    ))
                }
            </ul>
        </nav>
    )
}