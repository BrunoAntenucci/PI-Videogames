import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchVideogames } from '../../actions/index';

import styles from '../SearchBar/SearchBar.module.css'

export default function SearchBar(){
    const dispatch = useDispatch();
    const [ name, setName ] = useState();

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchVideogames(name))
    }

    return (
        <div>
            <input
                className={styles.text}
                type="text"
                placeholder="Search..."
                onChange={(e) => handleInputChange(e)}               
            />
            <button className={styles.text} type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )

}