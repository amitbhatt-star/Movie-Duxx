// Importing necessary libraries and components
import React from 'react';// Import React
import '../styles.css';// Import styles for Watchlist
import MovieCard from './MovieCard';// Import MovieCard component to display individual movies

// Watchlist component, receiving movies, watchlist, and toggleWatchlist as props
export default function Watchlist({movies, watchlist, toggleWatchlist}){
    return(
        <div>
            <h1 className="title">Your Watchlist</h1>
            <div className='watchlist'>
                {
                    watchlist.map(id =>{
                        const movie= movies.find(movie => movie.id ===id);
                        return <MovieCard key={id}movie={movie} toggleWatchlist={toggleWatchlist} isWatchlisted={true}></MovieCard>
                    })
                }
            </div>
        </div>
    );
}