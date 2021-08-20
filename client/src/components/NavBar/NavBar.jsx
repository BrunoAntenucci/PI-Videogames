import React from "react";
import style from '../NavBar/NavBar.module.css'
import { Link } from "react-router-dom";

export default function Nav(){

    return(
        <div className={style.div}>
            <ul className={style.ul}>
                <li><Link className={style.li} to='/home'>Home </Link></li>
                <li><Link className={style.li} to='/creation'>Create Videogame</Link></li>
                <li><Link className={style.li} id={style.ab}to='/about'>About</Link></li>

            </ul>
        </div>
    )

}