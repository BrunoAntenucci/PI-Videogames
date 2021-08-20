import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postVideogame, getGenres } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../NavBar/NavBar';
import styles from '../VideogameCreation/VideogameCreation.module.css'

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'A name is required';
    }
    if(!input.description){
        errors.description = 'A description is required';
    }
    if(!input.img){
        errors.img = 'A link for an image is required';
    }
    if(!input.release){
        errors.release = 'A release date is required';
    }
    if(!input.rating || input.rating > 5 || input.rating < 1){
        errors.rating = 'A number from 1 to 5 is requiered';
    }
    return errors
}


export default function VideogameCreation(){
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector((state) => state.genres)
    const videogames = useSelector((state) => state.videogames);
    const [ errors, setErrors ] = useState({});
    console.log(videogames)

    const [ input, setInput ] = useState({
        name: '',
        description: '',
        img:'',
        released: '',
        rating: '',
        plataform: [],
        genres: []
    });

    const getPlataforms = function ()  {
        let aux = videogames;
        let aux2 =  aux.map((e) => e.plataform).flat(5)
        let aux3 =  new Set(aux2)
        let plat =  [...aux3]
        return plat
    }
    const plataforms = getPlataforms();

    function handleGenre(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    } 

    function handlePlataforms(e){
        setInput({
            ...input,
            plataform: [...input.plataform, e.target.value]
        })
    } 

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,

        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }))
        console.log(input)
    }

    function handleSubmit(e){
        if(!errors.name) {
        e.preventDefault();
        dispatch(postVideogame(input));
        alert('Videogame created');
        setInput({
            name: '',
            description: '',
            img:'',
            released: '',
            rating: '',
            plataform: [],
            genres: []
        })
        history.push('/home')
        }else{
        e.preventDefault();
        alert('Form incomplete');
        }
    }

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch])




    return(
        <div>
            <Nav/>
            <Link to='/home'>
                <button>Back</button>
            </Link>
            <div className={styles.pos}>
                    <h1 className={styles.title}>Create New Videogame</h1>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={styles.row}>
                            <div className={styles.fields}>
                                <div>
                                    <label className={styles.labels}>Name </label>                                    
                                    <input
                                    type='text'
                                    value={input.name}
                                    name='name'
                                    onChange={handleChange}
                                    />                                                                                
                                    {errors.name && (
                                        <p className={styles.error}>{errors.name}</p>
                                    )} 
                                </div>
                                <div>
                                    <label className={styles.labels}>Description </label>
                                    <input
                                    type='text'
                                    value={input.description}
                                    name='description'
                                    onChange={handleChange}
                                    />                                       
                                    {errors.description && (
                                        <p className={styles.error}>{errors.description}</p>
                                    )}                                                                                                        
                                </div>
                                <div>
                                    <label className={styles.labels}>Image </label>
                                    <input
                                    type='text'
                                    value={input.img}
                                    name='img'
                                    onChange={handleChange}
                                    />                                    
                                    {errors.img && (
                                        <p className={styles.error}>{errors.img}</p>
                                    )}                                                                        
                                </div>
                                <div>
                                    <label className={styles.labels}>Release Date </label>
                                    <input
                                    type='text'
                                    value={input.release}
                                    name='release'
                                    onChange={handleChange}
                                    />
                                    {errors.release && (
                                        <p className={styles.error}>{errors.release}</p>
                                    )}
                                </div>
                                <div>
                                    <label className={styles.labels}>Rating </label>
                                    <input
                                    type='number'
                                    value={input.rating}
                                    name='rating'
                                    onChange={handleChange}
                                    />
                                    {errors.rating && (
                                        <p className={styles.error}>{errors.rating}</p>
                                    )}
                                </div>
                            </div>
                            <div className={styles.rowsel}>
                                <div id={styles.genre} className={styles.col}>
   
                                    <select className={styles.sel} onChange={handleGenre}>
                                        {
                                            genres.map((e) => 
                                            <option value={e.name}>{e.name}</option>
                                            )
                                        }
                                    </select>
                                    <ul className={styles.ul}>{input.genres.map(e => <li className={styles.lists}>{e}</li>)}</ul>
                                </div>
                                <div className={styles.col}>
                                
                                    <select className={styles.sel} onChange={handlePlataforms}>
                                        {
                                            plataforms.map((e) =>
                                                <option value={e}>{e}</option>
                                            )
                                        }
                                    </select>
                                    <ul className={styles.ul}>{input.plataform.map(e => <li className={styles.lists}>{e}</li>)}</ul>
                                </div>
                            </div>
                        </div>
                        <button className={styles.button} type='submit'>Create Videogame</button>
                    </form>
            </div>                        
        </div>
    )
}