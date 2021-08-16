import React from 'react';

export default function Card({name, img}){
    return(
        <div>
            <h3>{name}</h3>
            <img src={img} alt="Img not found" width="350px" height="200px"/>

        </div>
    )

}