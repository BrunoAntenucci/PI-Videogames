import React from "react";
import { Link } from "react-router-dom";

export default function Nav(){

    return(
        <div>
            <ul>
                <li><Link to='/home'>Home </Link></li>
                <li><Link to='/creation'>Create Videogame</Link></li>
            </ul>
        </div>
    )

}