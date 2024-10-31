// Importing React library and styles
import React from "react";
import "../styles.css";

// MovieCard component takes in movie data, its watchlist status, and a function to toggle the watchlist
export default function MovieCard({ movie,isWatchlisted,toggleWatchlist }) {
  // Handles any errors when loading the image by setting a default placeholder image
  const handleError = (e) => {
    e.target.src = "images/default.jpg";
  };

  // Determines the CSS class for the movie rating based on the rating value
  const getRatingClass = (rating)=>{
    if(rating>=8){
        return 'rating-good';
    }

    if(rating>=5 && rating <8)return "rating-ok";
        

    return "rating-bad";
    
  };

 
  // rendering the moviecard component 
  return (
    <div key={movie.id} className="movie-card">
      <img src={`images/${movie.image}`} alt={movie.title} />
      <div className="movie-card-title">
      <h3 className="movie-card-title">{movie.title}</h3>

        <div>
        <span className="movie-card-genre">{movie.genre}</span>
        <span className={`movie-card-rating ${getRatingClass(movie.rating)}`}>{movie.rating}</span>

        </div>
        <label className="switch">
          <input type="checkbox" checked={isWatchlisted} onChange={()=>toggleWatchlist(movie.id)}></input>
          <span className="slider">
            <span className="slider-label">{isWatchlisted ? "In Watchlist": "Add to Watchlist"}</span>
          </span>
        </label>
        
      </div>
    </div>
  );
}
