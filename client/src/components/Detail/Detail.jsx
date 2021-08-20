import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions';
import { useEffect } from 'react';
import styles from '../Detail/Detail.module.css'
import Nav from '../NavBar/NavBar';


export default function Detail(props){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch, props.match.params.id]);

    const selectedVideogame = useSelector((state) => state.detail)

    return(
        
        <div>
            <Nav/>
            {
                selectedVideogame.length > 0? 
                    <div className={styles.ubi}>                
                        <div className={styles.pos}>
                            <img src={selectedVideogame[0].img} alt="Image not found" className={styles.img}/>
                            <div className={styles.textbox}>
                                <div>
                                    <h1 id={styles.titles} className={styles.text}>{selectedVideogame[0].name}</h1>
                                    <h4 id={styles.info} className={styles.text}>Description: {selectedVideogame[0].description ? selectedVideogame[0].description : "No description"}</h4>
                                    <h4 id={styles.info} className={styles.text}>Release date: {selectedVideogame[0].released ? selectedVideogame[0].released : "No data"}</h4>
                                    <h4 id={styles.info} className={styles.text}>Rating: {selectedVideogame[0].rating ? selectedVideogame[0].rating : "No data"}</h4>
                                </div>
                                <div className={styles.lists}>
                                    <div>
                                        <h4 id={styles.titles} className={styles.text}>Genres</h4>
                                        <ul className={styles.ul}>{selectedVideogame[0].createdInDb === true ? selectedVideogame[0].genres.map((e) => <li className={styles.li}>{e.name}</li>) : selectedVideogame[0].genres.map((e) => <li className={styles.li}>{e}</li>) }</ul>
                                    </div>
                                    <div>
                                        <h4 id={styles.titles} className={styles.text}>Platforms</h4>
                                        <ul id={styles.plat} className={styles.ul}>{selectedVideogame[0].plataform ? selectedVideogame[0].plataform.map((e) => <li className={styles.li}>{e}</li>) : "No data"}</ul>
                                    </div>
                                </div>
                            </div>    
                        </div>
                    </div>    
                : <h1>Not found</h1>

            }
                <Link className={styles.button} to='/home'>
                    <button className={styles.btntext}>Back</button>
                </Link>    
        </div>
    )
} 