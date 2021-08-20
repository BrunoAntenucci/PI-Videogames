import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../LandingPage/LandingPage.module.css'

export default function LandingPage(){
    return(
        <div>
            <h1 className={styles.title}>Welcome</h1>
            <Link to='/home'>
                <h2 className={styles.link}>Enter</h2>
            </Link>
        </div>
    )
} 