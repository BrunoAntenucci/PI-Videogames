import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../About/About.module.css'
import Nav from '../NavBar/NavBar' 

export default function About(){
    return(
        <div>
            <Nav/>
            <div className={styles.pos}>
                <Link to='/home'>
                            <button className={styles.button}>Back</button>
                </Link>    
                <div>
                    <h1 className={styles.title}>About</h1>
                    <h4 className={styles.text}>Esta es una pagina muy fachera</h4>
                    <br/>

                </div>
            </div>
        </div>
    )
} 