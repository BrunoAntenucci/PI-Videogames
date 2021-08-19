import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({name, img, genres, id, createdInDb}){
    return(
        <div>
            <Link to={`/home/${id}`}>
                <h3>{name}</h3>
            </Link>
            <img src={img} alt="Img not found" width="350px" height="200px"/>
            <ul>{createdInDb === true ? genres.map((e) => <li>{e.name}</li>) : genres.map((e) => <li>{e}</li>) }</ul>

        </div>
    )

}