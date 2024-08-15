import React, { useState } from 'react'
import styles from './MovieApp.module.css'

export const MovieApp = () => {

    const baseUrl = 'https://api.themoviedb.org/3/search/movie'
    const apiKey = 'c7a8d719cdf4d00451cc6a377473d887'

    const [ search, setSearch ] = useState('')
    const [ movieList, setMovieList ] = useState([])

    const handleInputChange = (event) => {
        setSearch(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchMovieData()
    }

    const fetchMovieData = async() => {
        try {
            const response = await fetch(`${baseUrl}?query=${search}&api_key=${apiKey}&language=es-ES`)
            const data = await response.json()
            console.log(data)
            setMovieList(data.results)
            console.log(data.results)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={styles.container}>
            <h1>Movie App</h1>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder='Ingrese la pelicula'
                    value={search}
                    onChange={handleInputChange}
                />
                <button type='submit' >Buscar</button>

            </form>
            {movieList &&
                <div className={styles.movieList}>
                    {movieList.map(movie => (
                        <div key={movie.id} className={styles.movieCard}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='{movie.title}'></img>
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                        </div>   
                    ))}
                </div>
            }
            
            
        </div>
    )
}
