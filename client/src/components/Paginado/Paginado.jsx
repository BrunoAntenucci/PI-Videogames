import React from "react";

export default function Paginado({cardsPerPage, allVideogames, paginado}){
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allVideogames/cardsPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    return(
        <nav>
            <ul>
                { pageNumbers && 
                    pageNumbers.map(number => (
                    <li key={number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                    ))
                }
            </ul>
        </nav>
    )
}