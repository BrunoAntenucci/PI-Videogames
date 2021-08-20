import React from 'react';
import style from '../Card/Card.module.css'
import { Link } from 'react-router-dom';

export default function Card({name, img, genres, id, createdInDb}){
    return(
        <div className={style.card}>
            <div >
                <img src={img} alt="Img not found" className={style.img}/>
            </div>
            <div  >
            <div className={style.id} >        
            <Link className={style.link} to={`/home/${id}`}>
                <h3 >{name}</h3>
            </Link>
            </div>
            <ul className={style.ul}>{createdInDb === true ? genres.map((e) => <li>{e.name}</li>) : genres.map((e) => <li>{e}</li>) }</ul>
            </div>
        </div>
    )

}