import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postVideogame, getGenres } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

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


    const getPlataforms = function ()  {
        let aux = videogames;
        let aux2 =  aux.map((e) => e.plataform).flat(5)
        let aux3 =  new Set(aux2)
        let plat =  [...aux3]
        console.log(plat)
        return plat
    }
    const plataforms = getPlataforms()
    console.log(plataforms)

    return(
        <div>
            <Link to='/home'>
                <button>Back</button>
            </Link>
            <h1>Create Videogame</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name</label>
                    <input
                    type='text'
                    value={input.name}
                    name='name'
                    onChange={handleChange}
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Description</label>
                    <input
                    type='text'
                    value={input.description}
                    name='description'
                    onChange={handleChange}
                    />
                    {errors.description && (
                        <p>{errors.description}</p>
                    )}
                </div>
                <div>
                    <label>Image</label>
                    <input
                    type='text'
                    value={input.img}
                    name='img'
                    onChange={handleChange}
                    />
                    {errors.img && (
                        <p>{errors.img}</p>
                    )}
                </div>
                <div>
                    <label>Release Date</label>
                    <input
                    type='text'
                    value={input.release}
                    name='release'
                    onChange={handleChange}
                    />
                    {errors.release && (
                        <p>{errors.release}</p>
                    )}
                </div>
                <div>
                    <label>Rating</label>
                    <input
                    type='number'
                    value={input.rating}
                    name='rating'
                    onChange={handleChange}
                    />
                    {errors.rating && (
                        <p>{errors.rating}</p>
                    )}
                </div>
                <select>
                    {
                        genres.map((e) => 
                        <option value={e.name}>{e.name}</option>
                        )
                    }
                </select>
                <select>
                    {
                        plataforms.map((e) =>
                            <option value={e}>{e}</option>
                        )
                    }
                </select>
                <button type='submit'>Create Videogame</button>
            </form>
        </div>
    )
}